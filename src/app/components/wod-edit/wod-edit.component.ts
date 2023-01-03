import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { first, Observable, Subscription } from "rxjs";
import { Toast, ToastType } from "src/app/models/toast.model";
import { WOD } from "src/app/models/wod";
import { LoadingStatusService } from "src/app/services/loading-status/loading-status.service";
import { ToastNotificationService } from "src/app/services/notification/toast-notification.service";
import { WODService } from "src/app/services/workouts/wod.service";




import {NgbModal, ModalDismissReasons, NgbDatepicker, NgbDateStruct, NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-wod-edit',
    templateUrl: './wod-edit.component.html',
    styleUrls: ['./wod-edit.component.css']
})
export class WODEditComponent implements OnInit, OnDestroy 
{

    levels:{id: number, name: string}[] = [
        { id: 0, name: "Open" },
        { id: 1, name: "Fitness" },
        { id: 2, name: "Life" },
        { id: 3, name: "Scaled" }
    ]

    // DATE PICKER
	hoveredDate: NgbDate | null = null;
	fromDate: NgbDate;
	toDate: NgbDate | null = null;
    navigation: string = 'arrows';
    outsideDays: string = 'visible';
    showWeekNumbers: boolean = true;


    // FORM
    public wods$: Observable<WOD[]>;
    public wodForm: FormGroup;
    public minDate: Date = new Date();
    //public viewMode: string;
    public wodId: string | null;
    private paramSubcription!: Subscription;
    public wodItem$: Observable<WOD>;


    constructor(private activatedRoute: ActivatedRoute, 
        private wodService: WODService,
        private loadingService: LoadingStatusService,
        private toastService: ToastNotificationService,
        private router: Router,
        private modalService: NgbModal,
        private calendar: NgbCalendar)
    {
        this.minDate.setDate(this.minDate.getDate() - 5);
        this.wodForm = new FormGroup({});

        this.wodItem$ = new Observable<WOD>();
        this.wodId = null;

        //this.viewMode = "READ";

        this.toDate = calendar.getToday();
		this.fromDate = calendar.getNext(calendar.getToday(), 'm', -2);

        this.wods$ = this.wodService.wods;
    }

    ngOnInit() 
    {
        // INITIALIZE FORM
        this.wodForm = new FormGroup({
            'title': new FormControl(null, Validators.required),
            'description': new FormControl(null, Validators.required),
            'level': new FormControl(null, [Validators.required]),
            'date': new FormControl(null, [Validators.required]),
            'coach-tip': new FormControl(null),
            'results': new FormControl(null, [Validators.required])
        });

        // GET DATA
        this.paramSubcription = this.activatedRoute.params
        .subscribe((params: Params) => 
        {
            const queryId : string | null = params['id'];
            // CREATE
            if(queryId == null)
            {
                this.wodId = null;
                //this.viewMode = "CREATE";
                this.wodItem$ = new Observable<WOD>();
                this.wodForm.reset();
            }
            // VIEW/EDIT
            else 
            {
                //this.viewMode = "VIEW";
                this.wodId = queryId
                this.wodItem$ = this.wodService.getWOD(this.wodId as string);

                Promise.resolve().then(() => this.loadingService.setLoadingStatus(true));

                // GET DETAILS
                this.wodItem$.subscribe({
                    next: (wod) => 
                    {
                        this.wodForm.get('date')?.setValue(wod.date);
                        this.wodForm.get('title')?.setValue(wod.title);
                        this.wodForm.get('level')?.setValue(wod.level);
                        this.wodForm.get('description')?.setValue(wod.description);
                        this.wodForm.get('coach-tip')?.setValue(wod.coachTip);
                        this.wodForm.get('results')?.setValue(wod.results);
                    },
                    error: (error) => 
                    {
                        const toast: Toast = {
                            type: ToastType.ERROR,
                            header: 'WOD Fetch',
                            body: 'Error occurred while fetching WOD.'
                        };
                        this.toastService.showToast(toast);

                        this.loadingService.setLoadingStatus(false);
                    },
                    complete: () => this.loadingService.setLoadingStatus(false)
                });
            }

        });
    }

    onSubmit()
    {
        if (this.wodForm.invalid)
        {
            const toast: Toast = {
                type: ToastType.WARNING,
                header: 'Invalid Form',
                body: 'Please check your input!'
            };
            this.toastService.showToast(toast);
            return;
        }

        // EDIT
        if(this.wodForm.valid && this.wodId != null)
        {
            this.wodItem$ = this.wodService.updateWOD(this.wodId ,this.wodForm.value);

            this.loadingService.setLoadingStatus(true);

            this.wodItem$.subscribe({
                next: (wod) => 
                {
                    this.loadingService.setLoadingStatus(false);
                    const toast: Toast = {
                        type: ToastType.SUCCESS,
                        header: 'WOD Updated',
                        body: 'Successfully updated WOD!'
                    };
                    //this.viewMode = 'VIEW';
                    this.toastService.showToast(toast);
                },
                error: (error) => 
                {
                    if (error.status != 401) 
                    {
                        const toast: Toast = {
                            type: ToastType.ERROR,
                            header: 'WOD Updating Error',
                            body: 'Unexpected error occurred while updating WOD.'
                        };
                        this.toastService.showToast(toast);
                    }

                    this.loadingService.setLoadingStatus(false);
                }
            });
        }
        // CREATE
        else if(this.wodForm.valid && this.wodId == null)
        {
            this.wodItem$ = this.wodService.addWOD(this.wodForm.value);

            this.loadingService.setLoadingStatus(true);

            this.wodItem$.subscribe({
                next: (wod) => 
                {
                    this.loadingService.setLoadingStatus(false);
                    const toast: Toast = {
                        type: ToastType.SUCCESS,
                        header: 'WOD Created',
                        body: 'WOD was successfully created!'
                    };
                    this.toastService.showToast(toast);

                    this.wodForm.reset();
                    //this.router.navigate(['/WOD']);
                },
                error: (error) => 
                {
                    if (error.status != 401) 
                    {
                        const toast: Toast = {
                            type: ToastType.ERROR,
                            header: 'WOD Creation Error',
                            body: 'Unexpected error occurred while creating WOD.'
                        };
                        this.toastService.showToast(toast);  
                    }

                    this.loadingService.setLoadingStatus(false);              
                }
            });
        }
    }

    ngOnDestroy()
    {
        this.paramSubcription.unsubscribe();
    }

    /*onEdit()
    {
        this.viewMode = 'EDIT';
    }*/

    onConfirm(content: any)
    {
        this.modalService.open(content, { centered: true, backdropClass: 'light-blue-backdrop' }).result
        .then(
            (result) => 
            {
                console.log(`Closed with: ${result}`);
            }, 
            (reason) => {
                console.log(`Dismissed ${reason}`);
            });
    }
 

    onDeleteWOD()
    {

        if(this.wodId == null)
            return;

        this.modalService.dismissAll('Delete WOD');
        this.loadingService.setLoadingStatus(true);

        this.wodService.deleteWOD(this.wodId).subscribe({
            next: () => 
            {
                const toast: Toast = {
                    type: ToastType.SUCCESS,
                    header: 'WOD Deletion',
                    body: 'Successfully deleted WOD!'
                };
                this.toastService.showToast(toast);

                this.loadingService.setLoadingStatus(false);
                this.wodService.clearWODS();
                this.wodForm.reset();
                this.wodId = null;
                //this.router.navigate(['/WOD']);
            },
            error: (error) => 
            {
                this.loadingService.setLoadingStatus(false);

                if (error.status != 401) 
                {
                    const toast: Toast = {
                        type: ToastType.ERROR,
                        header: 'WOD Deletion',
                        body: 'Unexpected error occurred while deleting WOD.'
                    };
                    this.toastService.showToast(toast);
                }
            }
        });
    }

    onClearForm()
    {
        this.wodForm.reset();
        this.wodId = null;
    }

    onSelectWOD(modal: any) 
    {
        this.modalService.open(modal, { centered: true, backdropClass: 'light-blue-backdrop', size: 'lg' }).result;
    }
    
    onLoadWODs()
    {
        if(this.toDate == null || this.fromDate == null)
        {
            return; 
        }

        const to = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
        const from = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);

        this.loadingService.setLoadingStatus(true);

        this.wodService.getWODsInRange(from, to).subscribe({
            error: (error) => 
            {
                this.loadingService.setLoadingStatus(false);

                if (error.status != 401) 
                {
                    const toast: Toast = {
                        type: ToastType.ERROR,
                        header: 'WOD Fetch',
                        body: 'Unexpected error occurred while fetching WODs.'
                    };
                    this.toastService.showToast(toast);
                }
            },
            complete: () => 
            {
                this.loadingService.setLoadingStatus(false);
            }
        });

    }

    onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
    }
}
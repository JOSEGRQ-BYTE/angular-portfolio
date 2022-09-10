import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { first, Observable, Subscription } from "rxjs";
import { Toast, ToastType } from "src/app/models/toast.model";
import { WOD } from "src/app/models/wod";
import { LoadingStatusService } from "src/app/services/loading-status/loading-status.service";
import { ToastNotificationService } from "src/app/services/notification/toast-notification.service";
import { WODService } from "src/app/services/wods/wod.service";

@Component({
    selector: 'app-wod-edit',
    templateUrl: './wod-edit.component.html',
    styleUrls: ['./wod-edit.component.css']
})
export class WODEditComponent implements OnInit, OnDestroy {
    

    levels:{id: number, name: string}[] = [
        { id: 0, name: "Open" },
        { id: 1, name: "Fitness" },
        { id: 2, name: "Life" },
        { id: 3, name: "Scaled" }
    ]

    // Reactive Form
    public wodForm: FormGroup;

    // Min Date for date picker 5 day prior today
    public minDate: Date = new Date();

    // Flag to know whether user is editing or creating one
    public isEditing!: boolean;
    private wodID: string;

    // Parameter Subscribtion
    private paramSubcription!: Subscription;

    public wodItem$: Observable<WOD>;


    constructor(private activatedRoute: ActivatedRoute, 
        private wodService: WODService,
        private loadingService: LoadingStatusService,
        private toastService: ToastNotificationService)
    {
        this.minDate.setDate(this.minDate.getDate() - 5);
        this.wodForm = new FormGroup({});

        this.wodItem$ = new Observable<WOD>();
        this.wodID = '';
    }

    ngOnInit() 
    {

        this.paramSubcription = this.activatedRoute.params
        .subscribe(
              (params: Params) => 
              {
                // Creating a New WOD
                if(params['id']=='Create')
                {
                    this.isEditing = false;
                    this.wodItem$ = new Observable<WOD>();
                    this.wodForm.reset();
                }
                // Editing and Existing WOD
                else 
                {
                    this.isEditing = true;
                    this.wodID = params['id']
                    this.wodItem$ = this.wodService.getWOD(params['id']);

                    Promise.resolve().then(() => {
                        this.loadingService.setLoadingStatus(true)
                    });

                    // Fetch WOD Info & Load Form
                    this.wodItem$.subscribe({
                        next: (data) => 
                        {

                            this.loadingService.setLoadingStatus(false);

                            this.wodForm.get('date')?.setValue(data.date);
                            this.wodForm.get('title')?.setValue(data.title);
                            this.wodForm.get('level')?.setValue(data.level);
                            this.wodForm.get('description')?.setValue(data.description);
                            this.wodForm.get('coach-tip')?.setValue(data.coachTip);
                            this.wodForm.get('results')?.setValue(data.results);
                        },
                        error: (error) => 
                        {
                            this.loadingService.setLoadingStatus(false);
                            const toast: Toast = {
                                type: ToastType.ERROR,
                                header: 'WOD Fetch',
                                body: 'Error occurred while fetching WOD.'
                            };
                            this.toastService.showToast(toast);
                        }
                    });
                }

              });


        this.wodForm = new FormGroup({
            'title': new FormControl(null, Validators.required),
            'description': new FormControl(null, Validators.required),
            'level': new FormControl(null, [Validators.required]),
            'date': new FormControl(null, [Validators.required]),
            'coach-tip': new FormControl(null),
            'results': new FormControl(null, [Validators.required])
        });



        

    }

    onSubmit()
    {

        // Do nothing if form is invalid
        if (this.wodForm.invalid)
            return;

        // Update existing WOD
        if(this.wodForm.valid && this.isEditing)
        {
            this.wodItem$ = this.wodService.updateWOD(this.wodID ,this.wodForm.value);

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
                    this.toastService.showToast(toast);
                },
                error: (error) => 
                {
                    this.loadingService.setLoadingStatus(false);
                    const toast: Toast = {
                        type: ToastType.ERROR,
                        header: 'WOD Updating Error',
                        body: 'Error occurred while updating WOD.'
                    };
                    this.toastService.showToast(toast);
                }
            });
        }
        // Create New WOD
        else if(this.wodForm.valid && !this.isEditing)
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
                },
                error: (error) => 
                {
                    this.loadingService.setLoadingStatus(false);
                    const toast: Toast = {
                        type: ToastType.ERROR,
                        header: 'WOD Creation Error',
                        body: 'Error occurred while creating WOD.'
                    };
                    this.toastService.showToast(toast);                }
            });
        }
    }

    ngOnDestroy()
    {
        this.paramSubcription.unsubscribe();
    }
}
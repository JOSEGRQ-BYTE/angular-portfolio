import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { first, Observable, Subscription } from "rxjs";
import { WOD } from "src/app/models/wod";
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


    constructor(private activatedRoute: ActivatedRoute, private wodService: WODService)
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


                    // Fetch WOD Info & Load Form
                    this.wodItem$.subscribe({
                        next: (data) => 
                        {
                            this.wodForm.get('date')?.setValue(data.date);
                            this.wodForm.get('title')?.setValue(data.title);
                            this.wodForm.get('level')?.setValue(data.level);
                            this.wodForm.get('description')?.setValue(data.description);
                            this.wodForm.get('coach-tip')?.setValue(data.coachTip);
                            this.wodForm.get('results')?.setValue(data.results);
                        },
                        error: (error) => 
                        {
                            console.log(error, "ERROR");
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
            console.log(this.wodForm.value)
            this.wodItem$ = this.wodService.updateWOD(this.wodID ,this.wodForm.value);


            this.wodItem$.subscribe({
                next: (wod) => {
                    console.log(wod, "NEXT UPDATE");
                },
                error: (error) => {
                    console.log(error, "ERROR UPDATE");
                },
                complete: () => {
                    console.log("COMPLETE UPDATE");
                }
            });
            /*this.authService.login(this.signInForm.value)
            .pipe(first())
            .subscribe({
                next: (user) => 
                {
                    this.router.navigate([this.returnUrl]);
                },
                error: (error) => console.error(error)
                //complete: () => console.info('complete') 
            });*/
        }
        // Create New WOD
        else if(this.wodForm.valid && !this.isEditing)
        {
            this.wodItem$ = this.wodService.addWOD(this.wodForm.value);

            this.wodItem$.subscribe({
                next: (wod) => {
                    console.log(wod, "NEXT");
                },
                error: (error) => {
                    console.log(error, "ERROR");
                },
                complete: () => {
                    console.log("COMPLETE");
                }
            });
        }
    }

    ngOnDestroy()
    {
        this.paramSubcription.unsubscribe();
    }
}
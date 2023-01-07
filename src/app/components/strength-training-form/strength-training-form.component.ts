import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { catchError, forkJoin, Observable, of, Subscription } from "rxjs";
import { ExerciseRequest } from "src/app/models/exercise-request.model";
import { ExerciseResponse } from "src/app/models/exercise-response.model";
import { Exercise } from "src/app/models/exercise.model";
import { StrengthTrainingRequest } from "src/app/models/strength-training-request.model";
import { StrengthTrainingResponse } from "src/app/models/strength-training-response.model";
import { StrengthTraining } from "src/app/models/strength-training.model";
import { Toast, ToastType } from "src/app/models/toast.model";
import { LoadingStatusService } from "src/app/services/loading-status/loading-status.service";
import { ToastNotificationService } from "src/app/services/notification/toast-notification.service";
import { ExerciseService } from "src/app/services/workouts/exercise.service";
import { StrengthService } from "src/app/services/workouts/strength.service";
import FunctionHelpers from "src/app/shared/utilities/functions";

@Component({
    selector: 'app-strength-training-form',
    templateUrl: './strength-training-form.component.html',
    styleUrls: ['./strength-training-form.component.css']
})
export class StrengthTrainingFormComponent implements OnInit, OnDestroy
{
    //PULL THIS FROM SERVER
    public execises$ : Observable<Exercise[]>;
    public workouts$ : Observable<StrengthTrainingResponse[]>;

    public workoutForm: FormGroup;
    public exerciseForm: FormGroup;
    private paramSubcription!: Subscription;
    public workoutId: string | null;
    public exerciseId: string | null;
    public formTitle: string;

    public currentExercise$ :Observable<ExerciseResponse>;
    public workoutDetails$: Observable<StrengthTrainingResponse>;


    constructor(
        private exerciseService: ExerciseService,
        private activatedRoute: ActivatedRoute, 
        private workoutService: StrengthService,
        private loadingService: LoadingStatusService,
        private toastService: ToastNotificationService,
        //private router: Router,
        private modalService: NgbModal
        )
    {
        this.execises$ = this.exerciseService.exercises;
        this.workouts$ = this.workoutService.workouts;

        this.workoutForm = new FormGroup({});
        this.exerciseForm = new FormGroup({});
        this.workoutId = null;
        this.exerciseId = null;
        this.workoutDetails$ = new Observable<StrengthTrainingResponse>();
        this.formTitle = 'Log New Exercise';

        this.currentExercise$ = new Observable<ExerciseResponse>();
    }

    onWorkoutSelected(event: any)
    {
        event.preventDefault();
        const anchorTag = event.target.closest('a') as HTMLAnchorElement;
        const id = anchorTag.dataset['id'];

        this.workoutId = id as string;
        this.workoutDetails$ = this.workoutService.getWorkout(this.workoutId);

        this.workoutDetails$.subscribe({
            next: (workout) => 
            {
                this.loadingService.setLoadingStatus(false);

                this.workoutForm.get('exerciseId')?.setValue(workout.exerciseId);
                this.workoutForm.get('weight')?.setValue(workout.weight);
                this.workoutForm.get('reps')?.setValue(workout.reps);
                this.workoutForm.get('sets')?.setValue(workout.sets);
            },
            error: (error) => 
            {
                this.loadingService.setLoadingStatus(false);
                const toast: Toast = {
                    type: ToastType.ERROR,
                    header: 'Workout Fetch',
                    body: 'Error occurred while fetching workout.'
                };
                this.toastService.showToast(toast);
            }
        });

        this.modalService.dismissAll('Exercise Selected');
    }

    onFetchData()
    {
        Promise.resolve().then(() => this.loadingService.setLoadingStatus(true));

        //this.fetchExercises();
        //this.fetchWorkouts();


        forkJoin({workouts: this.workoutService.getDetailedWorkouts().pipe(catchError(error => of(error))), exercises: this.exerciseService.getExercises().pipe(catchError(error => of(error)))})
        .subscribe({
            next: (resultsArray) => 
            {

                if(FunctionHelpers.IsIntanceOfError(resultsArray.workouts))
                {
                    const toast: Toast = {
                        type: ToastType.ERROR,
                        header: 'Workout Fetch',
                        body: 'Unexpected occurred while fetching workouts.'
                    };
                    this.toastService.showToast(toast);
                }

                if(FunctionHelpers.IsIntanceOfError(resultsArray.exercises))
                {
                    const toast: Toast = {
                        type: ToastType.ERROR,
                        header: 'Exercises Fetch',
                        body: 'Unexpected occurred while fetching exercises.'
                    };
                    this.toastService.showToast(toast);
                }
                
            },
            complete: () => this.loadingService.setLoadingStatus(false) 
        });


    }

    fetchExercises()
    {
        this.exerciseService.getExercises().subscribe({
            error: (error) => {
                const toast: Toast = {
                    type: ToastType.ERROR,
                    header: 'Exercise Fetch',
                    body: 'Unexpected error occurred while fetching exercises.'
                };
                this.toastService.showToast(toast);
                this.loadingService.setLoadingStatus(false);
            },
            complete: () => this.loadingService.setLoadingStatus(false)
        });
    }

    fetchWorkouts()
    {
        this.workoutService.getDetailedWorkouts().subscribe({
            error: (error) => {
                const toast: Toast = {
                    type: ToastType.ERROR,
                    header: 'Workout Fetch',
                    body: 'Unexpected error occurred while fetching workouts.'
                };
                this.toastService.showToast(toast);
                this.loadingService.setLoadingStatus(false);
            },
            complete: () => this.loadingService.setLoadingStatus(false)
        });
    }

    ngOnInit()
    {

        this.paramSubcription = this.activatedRoute.params
        .subscribe(
              (params: Params) => 
              {
                const id = params['id'];
                if(!!id)
                {
                    this.workoutId = id;
                    this.workoutDetails$ = this.workoutService.getWorkout(id);

                    Promise.resolve().then(() => this.loadingService.setLoadingStatus(true));

                    // FETCH WORKOUT & LOAD FORM
                    this.workoutDetails$.subscribe({
                        next: (data) => 
                        {
                            this.workoutForm.get('exerciseId')?.setValue(data.exerciseId);
                            this.workoutForm.get('weight')?.setValue(data.weight);
                            this.workoutForm.get('reps')?.setValue(data.reps);
                            this.workoutForm.get('sets')?.setValue(data.sets);
                        },
                        error: (error) => 
                        {
                            const toast: Toast = {
                                type: ToastType.ERROR,
                                header: 'Exercise Fetch',
                                body: 'Error occurred while fetching exercise.'
                            };
                            this.toastService.showToast(toast);

                            this.loadingService.setLoadingStatus(false);
                        },
                        complete: () => this.loadingService.setLoadingStatus(false),
                    });
                }
                else 
                {
                    this.workoutId = null;
                    this.workoutDetails$ = new Observable<StrengthTrainingResponse>();
                    this.workoutForm.reset();
                }

            });

        this.workoutForm = new FormGroup({
            'exerciseId': new FormControl(null, Validators.required),
            'weight': new FormControl(null, Validators.required),
            'reps': new FormControl(null, Validators.required),
            'sets': new FormControl(null, Validators.required),
        });

        this.exerciseForm = new FormGroup({
            'exerciseName': new FormControl(null, Validators.required),
            'description': new FormControl(null, Validators.required),
        });

        this.onFetchData();
    }

    ngOnDestroy()
    {
        this.paramSubcription.unsubscribe();
    }

    onSubmitExercise()
    {

        if(this.exerciseForm.invalid)
        {
            const toast: Toast = {
                type: ToastType.WARNING,
                header: 'Invalid Form',
                body: 'Please check your input!'
            };
            this.toastService.showToast(toast);
            return;
        }

        // CREATE
        if(this.exerciseForm.valid && this.exerciseId === null)
        {
            this.currentExercise$ = this.exerciseService.addExercise(this.exerciseForm.value as ExerciseRequest);

            this.loadingService.setLoadingStatus(true);

            this.currentExercise$.subscribe({
                next: (exercise) => 
                {
                    const toast: Toast = {
                        type: ToastType.SUCCESS,
                        header: 'Exercise Added',
                        body: 'Exercise was successfully added!'
                    };
                    this.toastService.showToast(toast);
                },
                error: (error) => 
                {
                    if (error.status != 401) 
                    {
                        const toast: Toast = {
                            type: ToastType.ERROR,
                            header: 'Exercise Creation Error',
                            body: 'Unexpected error occurred while adding exercise.'
                        };
                        this.toastService.showToast(toast);  
                    }
                    this.loadingService.setLoadingStatus(false);           
                },
                complete: () => 
                {
                    this.loadingService.setLoadingStatus(false);
                    this.exerciseForm.reset();
                    this.fetchExercises();
                }
            });
        }
        // EDIT
        else if(this.exerciseForm.valid)
        {

            this.currentExercise$ = this.exerciseService.updateExercise(this.exerciseId as string, this.exerciseForm.value);

            this.loadingService.setLoadingStatus(true);

            this.currentExercise$.subscribe({
                next: (exercise) => 
                {
                    this.loadingService.setLoadingStatus(false);
                    const toast: Toast = {
                        type: ToastType.SUCCESS,
                        header: 'Exercise Updated',
                        body: 'Successfully updated exercise!'
                    };
                    this.toastService.showToast(toast);

                    // ENTER EDIT MODE
                    this.exerciseId = null;
                },
                error: (error) => 
                {
                    if (error.status != 401) 
                    {
                        const toast: Toast = {
                            type: ToastType.ERROR,
                            header: 'Exercise Updating Error',
                            body: 'Unexpected error occurred while updating exercise.'
                        };
                        this.toastService.showToast(toast);
                    }

                    this.loadingService.setLoadingStatus(false);
                },
                complete: () => 
                {
                    this.loadingService.setLoadingStatus(false);
                    this.fetchExercises();
                }
            });
        }
    }

    onSubmit()
    {
        if (this.workoutForm.invalid)
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
        if(this.workoutForm.valid && this.workoutId != null)
        {
            this.workoutDetails$ = this.workoutService.updateWorkout(this.workoutId, this.workoutForm.value as StrengthTrainingRequest);

            this.loadingService.setLoadingStatus(true);

            this.workoutDetails$.subscribe({
                error: (error) => 
                {
                    if (error.status != 401) 
                    {
                        const toast: Toast = {
                            type: ToastType.ERROR,
                            header: 'Workout Updating Error',
                            body: 'Unexpected error occurred while updating workout.'
                        };
                        this.toastService.showToast(toast);
                    }

                    this.loadingService.setLoadingStatus(false);
                },
                complete: () => 
                {
                    this.loadingService.setLoadingStatus(false);
                    const toast: Toast = {
                        type: ToastType.SUCCESS,
                        header: 'Workout Updated',
                        body: 'Successfully updated workout!'
                    };
                    this.toastService.showToast(toast);
                }
            });
        }
        // CREATE
        else if(this.workoutForm.valid && this.workoutId == null)
        {
            this.workoutDetails$ = this.workoutService.addWorkout(this.workoutForm.value as StrengthTrainingRequest);

            this.loadingService.setLoadingStatus(true);

            this.workoutDetails$.subscribe({
                error: (error) => 
                {
                    if (error.status != 401) 
                    {
                        const toast: Toast = {
                            type: ToastType.ERROR,
                            header: 'Workout Creation Error',
                            body: 'Unexpected error occurred while creating workout.'
                        };
                        this.toastService.showToast(toast);  
                    }

                    this.loadingService.setLoadingStatus(false);              
                },
                complete: () => 
                {
                    this.loadingService.setLoadingStatus(false);
                    const toast: Toast = {
                        type: ToastType.SUCCESS,
                        header: 'Workout Created',
                        body: 'Workout was successfully created!'
                    };
                    this.toastService.showToast(toast);

                    this.workoutForm.reset();
                }
            });
        }

    }

    onSwitchForms(event: any)
    {
        const switchButton = event.target.closest("button") as HTMLButtonElement;

        switchButton.disabled = true;

        if(switchButton.dataset["currentForm"] == 'workout')
        {
            const currentForm = document.getElementById('workout-form') as HTMLFormElement;
            const secondForm = document.getElementById('exercise-form') as HTMLFormElement;
            currentForm.classList.add('switch');
            this.formTitle = 'Add New Exercise';
            setTimeout(() =>
            {
                currentForm.classList.remove('active');
                currentForm.classList.remove('switch');

                secondForm.classList.add('active');
                switchButton.disabled = false;
                switchButton.dataset["currentForm"] = 'exercise';
                this.workoutForm.reset();

            }, 250);
        }
        else 
        {
            const secondForm = document.getElementById('workout-form') as HTMLFormElement;
            const currentForm = document.getElementById('exercise-form') as HTMLFormElement;
            currentForm.classList.add('switch');
            this.formTitle = 'Log New Exercise';
            setTimeout(() =>
            {
                currentForm.classList.remove('active');
                currentForm.classList.remove('switch');

                secondForm.classList.add('active');
                switchButton.disabled = false;

                switchButton.dataset["currentForm"] = 'workout';
                this.exerciseForm.reset();

            }, 250);
        }

        this.workoutId = null;
        this.exerciseId = null;
    }

    onPickExercise(content: any)
    {
        this.modalService.open(content, { centered: true, backdropClass: 'light-blue-backdrop' }).result
        .then(
            (result) => 
            {
               // console.log(`Closed with: ${result}`);
            }, 
            (reason) => {
                //console.log(`Dismissed ${reason}`);
            });
    }

    onExerciseSelected(id: string)
    {
        this.currentExercise$ = this.exerciseService.getExercise(id);
        this.exerciseId = id;

        this.currentExercise$.subscribe({
            next: (exercise) => 
            {
                this.loadingService.setLoadingStatus(false);

                this.exerciseForm.get('exerciseName')?.setValue(exercise.exerciseName);
                this.exerciseForm.get('description')?.setValue(exercise.description);
            },
            error: (error) => 
            {
                this.loadingService.setLoadingStatus(false);
                const toast: Toast = {
                    type: ToastType.ERROR,
                    header: 'Exercise Fetch',
                    body: 'Error occurred while fetching exercise.'
                };
                this.toastService.showToast(toast);
            }
        });

        this.modalService.dismissAll('Exercise Selected');
    }

    onClearForm(event: any)
    {
        const currentForm = event.target.closest('form') as HTMLFormElement;

        if(currentForm.id == 'exercise-form')
            this.exerciseForm.reset();
        else
            this.workoutForm.reset();

        this.exerciseId = null;
        this.workoutId = null;
    }

    onDeleteConfirmation(modalContet: any) 
    {
        this.modalService.open(modalContet, { centered: true, size : 'sm' }).result
        .then(
            (result) => 
            {
                //console.log(`Closed with: ${result}`);
            }, 
            (reason) => {
                //console.log(`Dismissed ${reason}`);
            });
    }

    onDeleteExercise()
    {
        if(this.exerciseId == null && this.workoutId == null)
            return;
        
        this.modalService.dismissAll('Delete Exercise');
        this.loadingService.setLoadingStatus(true);

        if(this.workoutId != null)
        {
            this.workoutService.deleteWorkout(this.workoutId as string).subscribe({
                error: () => 
                {
                    this.loadingService.setLoadingStatus(false);
                    const toast: Toast = {
                        type: ToastType.ERROR,
                        header: 'Workout Deletion',
                        body: 'Error occurred while deleting workout.'
                    };
                    this.toastService.showToast(toast);
                },
                complete: () => {
    
                    const toast: Toast = {
                        type: ToastType.SUCCESS,
                        header: 'Workout Deletion',
                        body: 'Successfully deleted workout.'
                    };
                    this.toastService.showToast(toast);
    
                    this.loadingService.setLoadingStatus(false);
                    this.fetchWorkouts();
                    this.workoutForm.reset();
                    this.workoutId = null;
                }
            });
        }
        else if(this.exerciseId != null)
        {
            this.exerciseService.deleteExercise(this.exerciseId as string).subscribe({
                error: () => {
                    this.loadingService.setLoadingStatus(false);
                    const toast: Toast = {
                        type: ToastType.ERROR,
                        header: 'Exercise Deletion',
                        body: 'Error occurred while deleting exercise.'
                    };
                    this.toastService.showToast(toast);
                },
                complete: () => {
    
                    const toast: Toast = {
                        type: ToastType.SUCCESS,
                        header: 'Exercise Deletion',
                        body: 'Successfully deleted exercise.'
                    };
                    this.toastService.showToast(toast);
    
                    this.loadingService.setLoadingStatus(false);
                    this.fetchExercises();
                    this.exerciseForm.reset();
                    this.exerciseId = null;
                }
            });
        }
    }
}
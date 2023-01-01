import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { environment } from '../../../environments/environment';
import { WOD } from "src/app/models/wod";
import { CreateWODDTO } from "src/app/models/create-wod.model";
import { AuthService } from "../authentication/auth.service";
import { StrengthTraining } from "src/app/models/strength-training.model";
import { WorkoutStatistics } from "src/app/models/workout-statistics.model";
import { StrengthTrainingRequest } from "src/app/models/strength-training-request.model";
import { StrengthTrainingResponse } from "src/app/models/strength-training-response.model";
@Injectable({ providedIn: 'root' })
export class StrengthService 
{
    private workoutsSubject: BehaviorSubject<StrengthTrainingResponse[]>;
    public workouts: Observable<StrengthTrainingResponse[]>;

    private statisticsSubject: BehaviorSubject<WorkoutStatistics[]>;
    public statistics: Observable<WorkoutStatistics[]>;

    constructor(private http: HttpClient, private authService: AuthService)
    {
        this.workoutsSubject = new BehaviorSubject<StrengthTrainingResponse[]>([]);
        this.workouts = this.workoutsSubject.asObservable();

        this.statisticsSubject = new BehaviorSubject<WorkoutStatistics[]>([]);
        this.statistics = this.statisticsSubject.asObservable();
    }

    public get currentWorkouts(): StrengthTraining[]
    {
        return [...this.currentWorkouts];
    }

    public get currentStatisitcs(): WorkoutStatistics[]
    {
        return [...this.currentStatisitcs];
    }

    public getWorkouts(): Observable<StrengthTrainingResponse[]>
    {
        //let queryParams = new HttpParams();

        //if(this.authService.currentUserValue.isLoggedIn && !!this.authService.currentUserValue.id)
        //    queryParams = queryParams.append("userID", this.authService.currentUserValue.id);

        return this.http.get<StrengthTrainingResponse[]>(`${environment.strengthTrainingURL}`/*, {params:queryParams}*/ )
            .pipe(
                map(w => {
                    this.workoutsSubject.next(w as StrengthTrainingResponse[]);
                    return w;
                })
            );
    }

    public getWorkout(id: string): Observable<StrengthTrainingResponse>
    {
        return this.http.get<StrengthTrainingResponse>(`${environment.strengthTrainingURL}/${id}`);
    }

    public getStatistics(): Observable<WorkoutStatistics[]>
    {
        return this.http.get<WorkoutStatistics[]>(`${environment.strengthTrainingURL}/GetWorkoutStatistics`)
        .pipe(
            map(w => {
                this.statisticsSubject.next(w as WorkoutStatistics[]);
                return w;
            })
        );
    }

    public addWorkout(workout: StrengthTrainingRequest): Observable<StrengthTrainingResponse>
    {
        return this.http.post<StrengthTrainingResponse>(`${environment.strengthTrainingURL}`, workout);
    }

    
    public updateWorkout(id: string, workout: StrengthTrainingRequest): Observable<StrengthTrainingResponse>
    {
        return this.http.put<StrengthTrainingResponse>(`${environment.strengthTrainingURL}/${id}`, workout);
    }

    public deleteWorkout(id: string): Observable<void>
    {
        return this.http.delete<void>(`${environment.strengthTrainingURL}/${id}`);
    }

    public getDetailedWorkouts(): Observable<StrengthTrainingResponse[]>
    {
        return this.http.get<StrengthTrainingResponse[]>(`${environment.strengthTrainingURL}/GetDetailedWorkouts`)
            .pipe(
                map(w => {
                    this.workoutsSubject.next(w as StrengthTrainingResponse[]);
                    return w;
                })
            );
    }
}
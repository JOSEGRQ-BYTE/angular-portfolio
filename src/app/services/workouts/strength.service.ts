import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { environment } from '../../../environments/environment';
import { WOD } from "src/app/models/wod";
import { CreateWODDTO } from "src/app/models/create-wod.model";
import { AuthService } from "../authentication/auth.service";
import { StrengthTraining } from "src/app/models/strength-training.model";
import { WorkoutStatistics } from "src/app/models/workout-statistics.model";

@Injectable({ providedIn: 'root' })
export class StrengthService 
{
    private workoutsSubject: BehaviorSubject<StrengthTraining[]>;
    public workouts: Observable<StrengthTraining[]>;

    private statisticsSubject: BehaviorSubject<WorkoutStatistics[]>;
    public statistics: Observable<WorkoutStatistics[]>;

    constructor(private http: HttpClient, private authService: AuthService)
    {
        this.workoutsSubject = new BehaviorSubject<StrengthTraining[]>([]);
        this.workouts = this.workoutsSubject.asObservable();

        this.statisticsSubject = new BehaviorSubject<WorkoutStatistics[]>([]);
        this.statistics = this.statisticsSubject.asObservable();
    }

    public get currentWorkouts(): StrengthTraining[]
    {
        return [...this.currentWorkouts];
    }

    public get currentStatisitcs(): StrengthTraining[]
    {
        return [...this.currentStatisitcs];
    }

    public getWorkouts(): Observable<StrengthTraining[]>
    {
        //let queryParams = new HttpParams();

        //if(this.authService.currentUserValue.isLoggedIn && !!this.authService.currentUserValue.id)
        //    queryParams = queryParams.append("userID", this.authService.currentUserValue.id);

        return this.http.get<StrengthTraining[]>(`${environment.strengthTrainingURL}`/*, {params:queryParams}*/ )
            .pipe(
                map(w => {
                    this.workoutsSubject.next(w as StrengthTraining[]);
                    return w;
                })
            );
    }

    public getWorkout(id: string): Observable<StrengthTraining>
    {
        return this.http.get<StrengthTraining>(`${environment.strengthTrainingURL}/${id}`);
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

    /*public addWOD(wod: CreateWODDTO): Observable<WOD>
    {
        return this.http.post<WOD>(`${environment.wodURL}`, wod);
    }


    public updateWOD(id: string, wod: CreateWODDTO): Observable<WOD>
    {
        return this.http.put<WOD>(`${environment.wodURL}/${id}`, wod);
    }

    public deleteWOD(id: string): Observable<void>
    {
        return this.http.delete<void>(`${environment.wodURL}/${id}`);
    }*/
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { Exercise } from "src/app/models/exercise.model";
import { ExerciseRequest } from "src/app/models/exercise-request.model";
import { ExerciseResponse } from "src/app/models/exercise-response.model";

@Injectable({ providedIn: 'root' })
export class ExerciseService 
{
    private exercisesSubject: BehaviorSubject<Exercise[]>;
    public exercises: Observable<Exercise[]>;

    constructor(private http: HttpClient)
    {
        this.exercisesSubject = new BehaviorSubject<Exercise[]>([]);
        this.exercises = this.exercisesSubject.asObservable();
    }

    // RETURNS LATEST DATA
    public get currentExercises(): Exercise[]
    {
        return [...this.currentExercises];
    }

    // GET ALL
    public getExercises(): Observable<Exercise[]>
    {
        return this.http.get<Exercise[]>(`${environment.exerciseURL}`)
            .pipe(
                map(data => 
                {
                    this.exercisesSubject.next(data as Exercise[]);
                    return data;
                })
            );
    }

    public getExercise(id: string): Observable<ExerciseResponse>
    {
        return this.http.get<ExerciseResponse>(`${environment.exerciseURL}/${id}`);
    }

    // ADD
    public addExercise(newExercise: ExerciseRequest): Observable<ExerciseResponse>
    {
        return this.http.post<ExerciseResponse>(`${environment.exerciseURL}`, newExercise);
    }

    // UPDATE
    public updateExercise(id: string, exercise: ExerciseRequest): Observable<ExerciseResponse>
    {
        return this.http.put<ExerciseResponse>(`${environment.exerciseURL}/${id}`, exercise);
    }

    // DELETE
    public deleteExercise(id: string): Observable<void>
    {
        return this.http.delete<void>(`${environment.exerciseURL}/${id}`);
    }
}
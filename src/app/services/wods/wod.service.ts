import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { User } from "../../models/user";
import { environment } from '../../../environments/environment';
import { WOD } from "src/app/models/wod";
import { CreateWODDTO } from "src/app/models/create-wod.model";
import { LoadingStatusService } from "../loading-status/loading-status.service";
import { AuthService } from "../authentication/auth.service";

@Injectable({ providedIn: 'root' })
export class WODService 
{
    private wodsSubject: BehaviorSubject<WOD[]>;
    public wods: Observable<WOD[]>;

    constructor(private http: HttpClient, private authService: AuthService)
    {
        // Initialization of subject
        this.wodsSubject = new BehaviorSubject<WOD[]>([]);
        this.wods = this.wodsSubject.asObservable();
    }

    public get currentWODS(): WOD[]
    {
        return [...this.currentWODS];
    }

    public getWODs(): Observable<WOD[]>
    {

        let queryParams = new HttpParams();

        if(this.authService.currentUserValue.isLoggedIn && !!this.authService.currentUserValue.id)
            queryParams = queryParams.append("userID", this.authService.currentUserValue.id);

        return this.http.get<WOD[]>(`${environment.wodURL}/GetWODs`, {params:queryParams} )
            .pipe(
                map(wods => {
                    this.wodsSubject.next(wods as WOD[]);
                    return wods;
                })
            );
    }

    public getWOD(id: string): Observable<WOD>
    {
        return this.http.get<WOD>(`${environment.wodURL}/${id}`);
    }

    public addWOD(wod: CreateWODDTO): Observable<WOD>
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
    }
}
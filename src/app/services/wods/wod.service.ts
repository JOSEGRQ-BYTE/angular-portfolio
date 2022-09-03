import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { User } from "../../models/user";
import { environment } from '../../../environments/environment';
import { WOD } from "src/app/models/wod";

@Injectable({ providedIn: 'root' })
export class WODService 
{
    private wodsSubject: BehaviorSubject<WOD[]>;
    public wods: Observable<WOD[]>;

    constructor(private http: HttpClient)
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
        return this.http.get<WOD[]>(`${environment.wodURL}`)
            .pipe(
                map(wods => {
                    this.wodsSubject.next(wods as WOD[]);
                    return wods;
                })
            );
    }
}
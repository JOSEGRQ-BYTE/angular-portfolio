import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { User } from "../../models/user";
import { environment } from '../../../environments/environment';
import { UserAuthentication } from "src/app/models/user-auth.model";
import { Toast, ToastType } from "src/app/models/toast.model";

@Injectable({ providedIn: 'root' })
export class LoadingStatusService 
{
    private loadingSubject: BehaviorSubject<boolean>;
    public loading$: Observable<boolean>;


    constructor()
    {
        this.loadingSubject = new BehaviorSubject<boolean>(false);
        this.loading$ = this.loadingSubject.asObservable();
    }


    public get currentToastValue(): boolean
    {
        return this.loadingSubject.value;
    }

    setLoadingStatus(loading: boolean)
    {
        this.loadingSubject.next(loading);
    }

}
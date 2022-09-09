import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Toast, ToastType } from "src/app/models/toast.model";

@Injectable({ providedIn: 'root' })
export class ToastNotificationService 
{
    public toastSubject: BehaviorSubject<Toast>;


    constructor()
    {
        this.toastSubject = new BehaviorSubject({
            header: '',
            body: '',
            type: ToastType.NON

        } as Toast);
    }


    public get currentToastValue(): Toast
    {
        return this.toastSubject.value;
    }

    showToast(content: Toast)
    {
        this.toastSubject.next(content as Toast);
        setTimeout(() => {
            this.dismissToast();
        }, 5000);
    }


    dismissToast()
    {
        this.toastSubject.next({
            header: '',
            body: '',
            type: ToastType.NON

        } as Toast);
    }

}
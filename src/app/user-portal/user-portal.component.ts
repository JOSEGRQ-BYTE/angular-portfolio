import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Toast, ToastType } from "../models/toast.model";
import { UserAuthentication } from "../models/user-auth.model";
import { AuthService } from "../services/authentication/auth.service";
import { ToastNotificationService } from "../services/notification/toast-notification.service";

@Component({
    selector: "app-user-portal",
    templateUrl: "./user-portal.component.html",
    styleUrls: ['./user-portal.component.css'],
})
export class UserPortalComponent
{

    userDetails$: Observable<UserAuthentication>;

    constructor(private authService: AuthService, private router: Router, private notificationService: ToastNotificationService)
    {
        this.userDetails$ =  this.authService.user;
    }

    onToggleUserPanel(e: any)
    {
        e.preventDefault();

        const toggle = e.target.closest('a') as HTMLAnchorElement;
        const sideBar = toggle.parentElement as HTMLDivElement;

        if(toggle.classList.contains('expanded'))
        {
            toggle.classList.remove('expanded');
            sideBar.classList.remove('expanded');
        }
        else
        {
            toggle.classList.add('expanded');
            sideBar.classList.add('expanded');
        }
    }

    onSignOut(e: any)
    {
        e.preventDefault();
        this.authService.logout();

        const toast: Toast = {
            type: ToastType.ERROR,
            header: 'Signed Out',
            body: 'You were successfully signed out!'
        };
        this.notificationService.showToast(toast);  
        this.router.navigate(['/Home']);

    }
}
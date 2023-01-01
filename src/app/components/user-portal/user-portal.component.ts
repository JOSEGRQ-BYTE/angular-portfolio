import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Toast, ToastType } from "../../models/toast.model";
import { UserAuthentication } from "../../models/user-auth.model";
import { AuthService } from "../../services/authentication/auth.service";
import { ToastNotificationService } from "../../services/notification/toast-notification.service";

@Component({
    selector: "app-user-portal",
    templateUrl: "./user-portal.component.html",
    styleUrls: ['./user-portal.component.css'],
})
export class UserPortalComponent implements OnInit
{

    userDetails$: Observable<UserAuthentication>;
    public profileSource: string;

    constructor(private authService: AuthService, private router: Router, private notificationService: ToastNotificationService)
    {
        this.userDetails$ =  this.authService.user;
        this.profileSource = this.authService.currentUserProfilePicture;
    }

    ngOnInit() 
    {

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
            type: ToastType.SUCCESS,
            header: 'Signed Out',
            body: 'You were successfully signed out!'
        };
        this.notificationService.showToast(toast);  
        this.router.navigate(['/Home']);

    }

    onNavLinkClicked(event: any)
    {
        event.preventDefault();
        const anchorLink = event.target.closest('a') as HTMLAnchorElement;

        const toggle = document.getElementById('user-side-bar-toggle') as HTMLAnchorElement;
        const nav = document.getElementById('user-side-bar') as HTMLDivElement;

        toggle.classList.remove('expanded');
        nav.classList.remove('expanded');

        this.router.navigate([anchorLink.dataset['link']]);


    }
}
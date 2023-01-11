import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable } from "rxjs";
import { Toast, ToastType } from "src/app/models/toast.model";
import { ToastNotificationService } from "../notification/toast-notification.service";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private toastService: ToastNotificationService)
    {}

    // ActivatedRouteSnapshot => 
    // RouterStateSnapshot => 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
    {
        if(!!this.authService.currentUserValue.expiration)
        {
            const expirationDate = new Date(this.authService.currentUserValue.expiration);
            const now = new Date();
            if(now > expirationDate)
            {
                this.authService.logout();
                const toast: Toast = {
                    type: ToastType.WARNING,
                    header: 'Token Expired',
                    body: 'Your token expired'
                };
                this.toastService.showToast(toast);

            }
        }

        if(this.authService.currentUserValue.isLoggedIn)
            return true;
        return this.router.createUrlTree(['/SignIn']);

    }

}
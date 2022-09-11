import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { Toast, ToastType } from "../models/toast.model";
import { User } from "../models/user";
import { UserAuthentication } from "../models/user-auth.model";
import { AuthService } from "../services/authentication/auth.service";
import { ToastNotificationService } from "../services/notification/toast-notification.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor
{ 
    constructor(private router: Router, 
        private authService: AuthService, 
        private toastService: ToastNotificationService)
    {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable< HttpEvent<any> > 
    {
        // You can retrict what request you need to modify by the url
        const storedInfo = localStorage.getItem('userDetails');
        let userDetails: UserAuthentication;

        if(!!storedInfo)
            userDetails = JSON.parse(storedInfo) as UserAuthentication;
        else
            userDetails = new UserAuthentication(null, null, null, null, null, false);

        // Handle Original Request
        if (!userDetails.token)
          return next.handle(request);


        // Clone/Modify Original Request & Append Token
        //const modifiedRequest = request.clone({ params: new HttpParams().set('Authorization', `Bearer ${userDetails.token}`) });


        const modifiedRequest = request.clone({
            setHeaders: {
            Authorization: `Bearer ${userDetails.token}`,
            //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        });


        return next.handle(modifiedRequest).pipe(tap({
            error: (error) => 
            {
                if (error instanceof HttpErrorResponse) 
                {
                    if (error.status != 401) 
                        return;

                    // If error returns 401 = Unauthorized then we prompt user to login
                    // Get rid of existing user credentials if needed to
                    this.authService.logout();
                    const toast: Toast = {
                        type: ToastType.ERROR,
                        header: 'Token Expired',
                        body: 'Please login again.'
                    };
                    this.toastService.showToast(toast);  
                    this.router.navigate(['/SignIn']);
                }
            }
        }));
    }
}
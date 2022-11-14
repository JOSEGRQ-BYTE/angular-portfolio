import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Toast, ToastType } from "../models/toast.model";
import { AuthService } from "../services/authentication/auth.service";
import { LoadingStatusService } from "../services/loading-status/loading-status.service";
import { ToastNotificationService } from "../services/notification/toast-notification.service";
import AppValidation from "../shared/utilities/validation";

@Component({
    selector: "app-reset-password",
    templateUrl: "./reset-password.component.html",
    styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent 
{
    public resetPasswordForm!: FormGroup;
    private paramSubcription!: Subscription;

    constructor(
        private route: ActivatedRoute, 
        private router: Router, 
        private authService: AuthService, 
        private toastService: ToastNotificationService,
        private loadingService: LoadingStatusService)
    {
    }

    ngOnInit()
    {
        this.resetPasswordForm = new FormGroup({
            'password': new FormControl(null, [Validators.required]),
            'confirmPassword': new FormControl(null, [Validators.required]),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'token': new FormControl(null, [Validators.required]),
        },
        [AppValidation.MatchValidator('password', 'confirmPassword')]);


        this.paramSubcription = this.route.queryParams
        .subscribe(
            (params: Params) => 
            {
                const token = params['token'];
                const email = params['email'];

                if(!!token && !!email)
                {
                    // Initialize the form with the query string params
                    this.resetPasswordForm.patchValue({
                        token: token,
                        email: email
                    });
                }
                else
                {
                    this.router.navigate(['/Home']);
                }
              });

    }

    onResetPassword()
    {
        if (this.resetPasswordForm.invalid)
            return;

        this.loadingService.setLoadingStatus(true);

        this.authService.resetPassword(this.resetPasswordForm.value)
        //.pipe(first())
        .subscribe({
            next: (res : string) => 
            {
                this.resetPasswordForm.reset();

                this.loadingService.setLoadingStatus(false);

                const toast: Toast = {
                    type: ToastType.SUCCESS,
                    header: 'Password Reset',
                    body: 'Your password was successfully reset! You may now login with your new password.'
                };
                this.toastService.showToast(toast);

                this.router.navigate(['/SignIn']);
            },
            error: (res) => 
            {

                this.loadingService.setLoadingStatus(false);
                
                const toast: Toast = {
                    type: ToastType.ERROR,
                    header: 'Password Reset Failed',
                    body: res.error,
                };
                this.toastService.showToast(toast);
            }
            });
    }
}
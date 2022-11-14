import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Toast, ToastType } from "../models/toast.model";
import { AuthService } from "../services/authentication/auth.service";
import { LoadingStatusService } from "../services/loading-status/loading-status.service";
import { ToastNotificationService } from "../services/notification/toast-notification.service";

@Component({
    selector: "app-forgot-password",
    templateUrl: "./forgot-password.component.html",
    styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent 
{
    public forgotPasswordForm!: FormGroup;

    constructor( 
        private authService: AuthService, 
        private toastService: ToastNotificationService,
        private loadingService: LoadingStatusService,
        private router: Router)
    {}

    ngOnInit()
    {
        this.forgotPasswordForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
        });
    }

    onSubmitChange()
    {
        if (this.forgotPasswordForm.invalid)
            return;


        this.loadingService.setLoadingStatus(true);

        // Request a password change at this point

        //console.log(this.forgotPasswordForm.value, "Form Value");

        this.authService.forgotPassword(this.forgotPasswordForm.value.email)
        //.pipe(first())
        .subscribe({
            next: (res : string) => 
            {
                this.forgotPasswordForm.reset();

                this.loadingService.setLoadingStatus(false);

                const toast: Toast = {
                    type: ToastType.SUCCESS,
                    header: 'Password Reset',
                    body: `A link was sent to: ${this.forgotPasswordForm.value.email}. Please follow instructions to reset password!`
                };
                this.toastService.showToast(toast);

                this.router.navigate(['/Home']);
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
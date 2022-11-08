import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs";
import { ChangePasswordFailedResponse } from "../models/change-password-failure.model";
import { Toast, ToastType } from "../models/toast.model";
import { AuthService } from "../services/authentication/auth.service";
import { LoadingStatusService } from "../services/loading-status/loading-status.service";
import { ToastNotificationService } from "../services/notification/toast-notification.service";
import AppValidation from "../shared/utilities/validation";

@Component({
    selector: "app-change-password",
    templateUrl: "./change-password.component.html",
    styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent
{
    public changePasswordForm!: FormGroup;

    constructor(
        //private activatedRoute: ActivatedRoute, 
        //private router: Router, 
        private authService: AuthService, 
        private toastService: ToastNotificationService,
        private loadingService: LoadingStatusService)
    {}

    ngOnInit()
    {
        this.changePasswordForm = new FormGroup({
            'currentPassword': new FormControl(null, [Validators.required]),
            'newPassword': new FormControl(null, [Validators.required]),
            'confirmPassword': new FormControl(null, [Validators.required]),
        },
        [AppValidation.MatchValidator('newPassword', 'confirmPassword')]);

        //this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/Home';
    }

    get passwordsMatch() 
    {
        return !this.changePasswordForm.getError('match') && this.changePasswordForm.get('confirmPassword')?.touched;
    }

    onSubmitChange()
    {
        if (this.changePasswordForm.invalid)
            return;
        else
        {
            this.loadingService.setLoadingStatus(true);

            // Request a password change at this point

            this.authService.changePassword(this.changePasswordForm.value)
            //.pipe(first())
            .subscribe({
                next: (res : string | ChangePasswordFailedResponse) => 
                {
                    this.loadingService.setLoadingStatus(false)
                    const toast: Toast = {
                        type: ToastType.SUCCESS,
                        header: 'Password Updated',
                        body: 'Your password was successfully updated!'
                    };
                    this.toastService.showToast(toast);
                    //this.router.navigate([this.returnUrl]);
                },
                error: (error) => 
                {
                    this.loadingService.setLoadingStatus(false)
                    const toast: Toast = {
                        type: ToastType.ERROR,
                        header: 'Password Update Failed',
                        body: 'Error occurred while attempting to update password.'
                    };
                    this.toastService.showToast(toast);
                }
             });
        }
    }
}
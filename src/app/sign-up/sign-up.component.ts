import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs";
import { Role, Roles } from "../data/roles";
import { Toast, ToastType } from "../models/toast.model";
import { AuthService } from "../services/authentication/auth.service";
import { LoadingStatusService } from "../services/loading-status/loading-status.service";
import { ToastNotificationService } from "../services/notification/toast-notification.service";
import AppValidation from "../shared/utilities/validation";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent 
{
    public signUpForm!: FormGroup;
    public roles: Role[] = Roles;

    constructor(
        private activatedRoute: ActivatedRoute, 
        private router: Router, 
        private authService: AuthService, 
        private toastService: ToastNotificationService,
        private loadingService: LoadingStatusService)
    {
        //this.returnUrl = '/Home';
    }

    ngOnInit()
    {
        this.signUpForm = new FormGroup({
            'role': new FormControl(null, [Validators.required]),
            'firstName': new FormControl(null, [Validators.required]),
            'lastName': new FormControl(null, [Validators.required]),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, 
                [Validators.required, 
                Validators.minLength(8),
                AppValidation.ContainsValidator(/[\W_]+/g, { doesNotContainNonAlphanumeric: true }),
                AppValidation.ContainsValidator(/\d/, { doesNotContainDigit: true }),
                AppValidation.ContainsValidator(/[A-Z]/, { doesNotContainUppercase: true }),
                AppValidation.ContainsValidator(/[a-z]/, { doesNotContainLowercase: true }) 
            ]),
            'confirmPassword': new FormControl(null, [Validators.required]),
        },
        [AppValidation.MatchValidator('password', 'confirmPassword')]);

        //this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/Home';
    }

    onSignUp()
    {

        if (this.signUpForm.invalid)
            return;

        this.loadingService.setLoadingStatus(true);

        this.authService.register(this.signUpForm.value)
        .pipe(first())
        .subscribe({
            next: (res) => 
            {

                console.log(res, "response");

                this.loadingService.setLoadingStatus(false);

                const toast: Toast = {
                    type: ToastType.SUCCESS,
                    header: 'Registered',
                    body: `Successfully registered! An email was sent to ${res.email} for verification. Token will expire in 2 hours.`
                };
                this.toastService.showToast(toast);

                this.signUpForm.reset();
            },
            error: (res) => 
            {
                console.log(res, "response error");

                this.loadingService.setLoadingStatus(false)
                const toast: Toast = {
                    type: ToastType.ERROR,
                    header: 'Registration Failure',
                    body: res.error
                };

                this.toastService.showToast(toast);
            }
        });
    }
}
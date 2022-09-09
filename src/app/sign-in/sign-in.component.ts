import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/authentication/auth.service";
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastNotificationService } from "../services/notification/toast-notification.service";
import { Toast, ToastType } from "../models/toast.model";
import { LoadingStatusService } from "../services/loading-status/loading-status.service";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit
{
    public signInForm!: FormGroup;
    private returnUrl!: string;

    constructor(private activatedRoute: ActivatedRoute, 
        private router: Router, 
        private authService: AuthService, 
        private toastService: ToastNotificationService,
        private loadingService: LoadingStatusService)
    {
        this.returnUrl = '/Home';
    }

    ngOnInit()
    {
        this.signInForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required]),
        });

        this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/Home';
    }

    onSignIn()
    {
        if (this.signInForm.invalid)
            return;

        if(this.signInForm.valid)
        {
            this.loadingService.setLoadingStatus(true);
            this.authService.login(this.signInForm.value)
            .pipe(first())
            .subscribe({
                next: (user) => 
                {
                    this.loadingService.setLoadingStatus(false)
                    const toast: Toast = {
                        type: ToastType.SUCCESS,
                        header: 'Authenticated',
                        body: 'You were successfully logged in!'
                    };
                    this.toastService.showToast(toast);
                    this.router.navigate([this.returnUrl]);
                },
                error: (error) => 
                {
                    this.loadingService.setLoadingStatus(false)
                    const toast: Toast = {
                        type: ToastType.ERROR,
                        header: 'Authentication Failure',
                        body: 'Error occurred while attempting to login.'
                    };
                    this.toastService.showToast(toast);
                }
                //complete: () => console.info('complete') 
             });
        }
    }

}
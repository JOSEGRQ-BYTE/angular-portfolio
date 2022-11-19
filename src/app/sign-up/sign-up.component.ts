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
    public previewSource: string;
    private maxFileSize: number;
    private validTypes: string[];

    constructor(
        private activatedRoute: ActivatedRoute, 
        private router: Router, 
        private authService: AuthService, 
        private toastService: ToastNotificationService,
        private loadingService: LoadingStatusService)
    {
        this.previewSource = '';
        this.maxFileSize = (1048576);
        this.validTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif','image/tif']
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
            'profilePicture': new FormControl(null, [Validators.required]),
            //'fileSource': new FormControl(null, [Validators.required])
        },
        [AppValidation.MatchValidator('password', 'confirmPassword')]);

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
                this.loadingService.setLoadingStatus(false);

                const toast: Toast = {
                    type: ToastType.SUCCESS,
                    header: 'Registered',
                    body: `Successfully registered! An email was sent to ${res.email} for verification. Token will expire in 2 hours.`
                };
                this.toastService.showToast(toast);

                this.signUpForm.reset();

                this.signUpForm.patchValue({
                    profilePicture: null
                });
                
                this.previewSource = '';
            },
            error: (res) => 
            {
                this.loadingService.setLoadingStatus(false);
                const toast: Toast = {
                    type: ToastType.ERROR,
                    header: 'Registration Failure',
                    body: res.error
                };

                this.toastService.showToast(toast);
            }
        });
    }

    onProfilePictureChanged(e: any)
    {
        e.preventDefault();

        const reader = new FileReader();
        const weHaveFile = e.target.files && e.target.files.length;

        if(weHaveFile) 
        {

            const fileInput = document.getElementById('profilePicture') as HTMLInputElement;
            const uploadedFile = e.target.files[0];
            this.signUpForm.get('profilePicture')?.markAllAsTouched();

            // Check File Size
            if(uploadedFile.size >= this.maxFileSize)
            {
                const toast: Toast = {
                    type: ToastType.WARNING,
                    header: 'Picture Failed to Load',
                    body: 'File size is too big. Please make sure the file is not bigger than 2mb.'
                };
                this.toastService.showToast(toast);

                //this.signUpForm.patchValue({
                //    profilePicture: null
                //});
                fileInput.value = '';
                this.signUpForm.get('profilePicture')?.updateValueAndValidity();

            }
            // Check File Type
            else if(!this.validTypes.includes(uploadedFile.type))
            {
                const toast: Toast = {
                    type: ToastType.WARNING,
                    header: 'Picture Failed to Load',
                    body: 'Image type not supported. Type must be png, jpg, jpeg, gif, or tif.'
                };
                this.toastService.showToast(toast);

                //this.signUpForm.patchValue({
                //    profilePicture: null
                //});
                fileInput.value = '';
                this.signUpForm.get('profilePicture')?.updateValueAndValidity();

            }
            // Good
            else
            {
                reader.readAsDataURL(uploadedFile);

                this.signUpForm.patchValue({
                    profilePicture: uploadedFile
                });
                this.signUpForm.get('profilePicture')?.updateValueAndValidity();

                reader.onload = () => 
                {
                    this.previewSource = reader.result as string;
                    //this.signUpForm.patchValue({
                    //    fileSource: reader.result
                    //});
                };
        
            }
        }
    }
}
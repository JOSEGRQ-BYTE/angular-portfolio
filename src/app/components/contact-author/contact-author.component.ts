import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Toast, ToastType } from "../../models/toast.model";
import { ContactAuthorService } from "../../services/contact-author/contact-author.service";
import { LoadingStatusService } from "../../services/loading-status/loading-status.service";
import { ToastNotificationService } from "../../services/notification/toast-notification.service";

@Component({
    selector: "app-contact-author",
    templateUrl: "./contact-author.component.html",
    styleUrls: ['./contact-author.component.css'],
})
export class ContactAuthorComponent implements OnInit
{
    public contactForm: FormGroup;

    constructor(private contactService: ContactAuthorService, 
        private toastService: ToastNotificationService,
        private loadingService: LoadingStatusService) 
    {
        this.contactForm = new FormGroup({});
    }

    ngOnInit() 
    {

        this.contactForm = new FormGroup({
            'firstname': new FormControl(null, Validators.required),
            'lastname': new FormControl(null, Validators.required),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'message': new FormControl(null, [Validators.required])
        });

    }

    onSend()
    {
        if(!this.contactForm.valid)
        {
            const toast: Toast = {
                type: ToastType.WARNING,
                header: 'Invalid Form',
                body: 'Please double check fields as they are all required.'
            };
            this.toastService.showToast(toast)
            return;
        }

        this.loadingService.setLoadingStatus(true);
        this.contactService.submitContactForm(this.contactForm.value).subscribe({
            next: (message) => 
            {
                this.loadingService.setLoadingStatus(false)
                const toast: Toast = {
                    type: ToastType.SUCCESS,
                    header: 'Form Submitted',
                    body: message
                };
                this.toastService.showToast(toast);
                this.contactForm.reset();
            },
            error: (error) => 
            {
                this.loadingService.setLoadingStatus(false)
                const toast: Toast = {
                    type: ToastType.ERROR,
                    header: 'Form Submission Failed',
                    body: 'Error occurred while attempting to submit form. Try again later!'
                };
                this.toastService.showToast(toast);
            }
        })
        
    }

}
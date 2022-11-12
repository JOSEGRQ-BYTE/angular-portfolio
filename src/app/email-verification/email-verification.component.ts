import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { Toast, ToastType } from "../models/toast.model";
import { AuthService } from "../services/authentication/auth.service";
import { LoadingStatusService } from "../services/loading-status/loading-status.service";
import { ToastNotificationService } from "../services/notification/toast-notification.service";

@Component({
    selector: "app-email-verification",
    templateUrl: "./email-verification.component.html",
    styleUrls: ['./email-verification.component.css'],
})
export class EmailVerificationComponent implements OnInit
{

    public verificationState$: Observable<string>;
    private paramSubcription!: Subscription;

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService, 
        private loadingService: LoadingStatusService,
        private router: Router,
        private toastService: ToastNotificationService
    )
    {
        this.verificationState$ = new Observable((x) => {x.next("LOADING")});
    }

    ngOnInit() 
    {
        //this.loadingService.setLoadingStatus(true);

        this.paramSubcription = this.route.queryParams
        .subscribe(

              (params: Params) => 
              {
                console.log(params, "ALL");
                    const token = params['token'];
                    const email = params['email'];

                    console.log(token, email, "HELLO")

                    if(!!token && !!email)
                    {

                        Promise.resolve().then(() => {
                            this.loadingService.setLoadingStatus(true)
                        });

                        this.authService.confirmEmail(token, email)
                        .subscribe({
                            next: (res) => 
                            {
                                console.log(res, ":)")
                                this.loadingService.setLoadingStatus(false);
                                this.verificationState$ = new Observable((x) => x.next("VERIFIED"));
                            },
                            error: (res) => 
                            {
                                this.loadingService.setLoadingStatus(false);
                                this.verificationState$ = new Observable((x) => x.next("FAILED"));
                                const toast: Toast = {
                                    type: ToastType.ERROR,
                                    header: 'Email Confirmation Failed',
                                    body: res.error
                                };
                                this.toastService.showToast(toast);
                            }
                        });
                    }
                    else
                    {
                        console.log('redirected')
                        //this.router.navigate(['/Home']);
                        //this.verificationState$ = new Observable((x) => x.next("FAILED"));
                    }
              });
    }



}
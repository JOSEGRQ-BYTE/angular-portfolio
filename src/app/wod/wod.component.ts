import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Toast, ToastType } from "../models/toast.model";
import { User } from "../models/user";
import { UserAuthentication } from "../models/user-auth.model";
import { WOD } from "../models/wod";
import { AuthService } from "../services/authentication/auth.service";
import { LoadingStatusService } from "../services/loading-status/loading-status.service";
import { ToastNotificationService } from "../services/notification/toast-notification.service";
import { WODService } from "../services/wods/wod.service";

@Component({
    selector: 'app-wod',
    templateUrl: './wod.component.html',
    styleUrls: ['./wod.component.css']
})
export class WODComponent implements OnInit
{
    public wods$: Observable<WOD[]>;
    public wodSelected: string;


    userDetails$: Observable<UserAuthentication>;

    constructor(private wodService: WODService, 
        private router: Router, 
        private authService: AuthService,
        private loadingService: LoadingStatusService,
        private toastService: ToastNotificationService)
    {
        this.wods$ =  this.wodService.wods;
        this.wodSelected = '';

        this.userDetails$ = this.authService.user;
    }

    ngOnInit() 
    {
        this.onFetchWODs();
    }

    onFetchWODs()
    {
        Promise.resolve().then(() => this.loadingService.setLoadingStatus(true));

        this.wodService.getWODs()
        .subscribe({
            next: (wods) => 
            {
                this.loadingService.setLoadingStatus(false);
            },
            error: (error) => 
            {
                console.log(error, 'HERE');

                if (error.status != 401) 
                {
                    const toast: Toast = {
                        type: ToastType.ERROR,
                        header: 'WOD Fetch',
                        body: 'Unexpected occurred while fetching WODs.'
                    };
                    this.toastService.showToast(toast);
                }

                this.loadingService.setLoadingStatus(false);
            }
        });

    }

    onCardSelected(card: any)
    {
        card.preventDefault();

        const wodCard:HTMLElement = card.target as HTMLElement;
        const anchorCard: HTMLAnchorElement = wodCard.closest('a.card') as HTMLAnchorElement;
        const parent = wodCard.closest('div#wod-container') as HTMLDivElement;

        parent.querySelectorAll('a.card').forEach(wod => {

            wod.classList.remove('selected');

        });

        this.wodSelected = anchorCard.getAttribute('data-id') != null? anchorCard.getAttribute('data-id') as string : '';
        anchorCard.classList.add('selected');

        if(this.authService.currentUserValue.isLoggedIn && this.wodSelected != '')
            this.router.navigate([`/User/${this.authService.currentUserValue.id}/WOD/${this.wodSelected}`]);

    }
}
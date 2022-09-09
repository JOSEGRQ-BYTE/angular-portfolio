import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { UserAuthentication } from "../models/user-auth.model";
import { WOD } from "../models/wod";
import { AuthService } from "../services/authentication/auth.service";
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

    constructor(private wodService: WODService, private router: Router, private authService: AuthService)
    {
        this.wods$ =  this.wodService.wods;
        this.wodSelected = '';

        this.userDetails$ = this.authService.user;
    }

    ngOnInit() 
    {
        this.wodService.getWODs()
        .subscribe({
            next: (wods) => 
            {
                console.log(wods);
            },
            error: (error) => console.error(error)
            //complete: () => console.info('complete') 
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
            this.router.navigate([`/WOD/${this.wodSelected}`]);

        console.log(this.authService.currentUserValue.isLoggedIn && this.wodSelected != '');

    }
}
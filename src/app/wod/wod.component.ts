import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { WOD } from "../models/wod";
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

    constructor(private wodService: WODService)
    {
        this.wods$ =  this.wodService.wods;
        this.wodSelected = '';
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

    }
}
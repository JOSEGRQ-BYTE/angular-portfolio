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

    constructor(private wodService: WODService)
    {
        this.wods$ =  this.wodService.wods;
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
}
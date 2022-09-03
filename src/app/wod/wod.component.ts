import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { WOD } from "../models/wod";
import { WODService } from "../services/wods/wod.service";

@Component({
    selector: 'app-wod',
    templateUrl: './wod.component.html',
    styleUrls: ['./wod.component.css']
})
export class WODComponent
{
    wods$: Observable<WOD[]>;

    constructor(private wodService: WODService)
    {
        this.wods$ =  this.wodService.wods;
    }
}
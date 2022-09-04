import { Component, EventEmitter, Input, Output } from "@angular/core";
import { WOD } from "src/app/models/wod";

@Component({
    selector: 'app-wod-card',
    styleUrls: ['./wod-card.component.css'],
    templateUrl: './wod-card.component.html'
})
export class WODCardComponent
{
    @Input() wod!:WOD;
    @Output() cardSelected: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();


    constructor()
    {
    }

    onSelected(card: MouseEvent)
    {
        this.cardSelected.emit(card);
    }
}
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable } from "rxjs";
import { UserAuthentication } from "src/app/models/user-auth.model";
import { WOD } from "src/app/models/wod";
import { AuthService } from "src/app/services/authentication/auth.service";

@Component({
    selector: 'app-wod-card',
    styleUrls: ['./wod-card.component.css'],
    templateUrl: './wod-card.component.html'
})
export class WODCardComponent
{
    @Input() wod!:WOD;
    @Output() cardSelected: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    public userDetails$: Observable<UserAuthentication>;

    constructor(private authService: AuthService)
    {
        this.userDetails$ = this.authService.user;
    }

    onSelected(card: MouseEvent)
    {
        this.cardSelected.emit(card);
    }
}
import { Component, OnInit } from "@angular/core";
import { UserModeService } from "src/app/services/user-mode/user-mode.service";
import { UserModes } from "src/app/services/user-mode/user-mode.service";

@Component({
    selector: "app-mode-toggle",
    templateUrl: "./mode-toggle.component.html",
    styleUrls: ['./mode-toggle.component.css'],
})
export class ModeToggleComponent implements OnInit
{
    constructor(private userModeService: UserModeService) 
    {
    }

    public toggleMode(event: Event): void
    {
        const checkbox: HTMLInputElement = event.target as HTMLInputElement;

        if(checkbox.checked)
            this.userModeService.userMode = UserModes.DARK;
        else
            this.userModeService.userMode = UserModes.LIGHT;
        console.log(event)
        //this.userModeService.userMode = mode as UserModes;
        /*if (this.userModeService.currentUserMode === UserModes.LIGHT) 
            this.userModeService.userMode = UserModes.DARK;
        else
            this.userModeService.userMode = UserModes.LIGHT;*/
    }

    ngOnInit()
    {
        if(this.userModeService.currentUserMode === UserModes.DARK)
            (document.getElementById('toggle-checkbox') as HTMLInputElement).checked=true;
        else
        (document.getElementById('toggle-checkbox') as HTMLInputElement).checked=false;
        //this.userModeService.userMode = UserModes.LIGHT;
        console.log(document.getElementById('toggle-checkbox'))
    }
}
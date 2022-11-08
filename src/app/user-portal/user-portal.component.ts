import { Component } from "@angular/core";

@Component({
    selector: "app-user-portal",
    templateUrl: "./user-portal.component.html",
    styleUrls: ['./user-portal.component.css'],
})
export class UserPortalComponent
{
    onToggleUserPanel(e: any)
    {
        e.preventDefault();

        const toggle = e.target.closest('a') as HTMLAnchorElement;
        const sideBar = toggle.parentElement as HTMLDivElement;

        if(toggle.classList.contains('expanded'))
        {
            toggle.classList.remove('expanded');
            sideBar.classList.remove('expanded');
        }
        else
        {
            toggle.classList.add('expanded');
            sideBar.classList.add('expanded');
        }
    }
}
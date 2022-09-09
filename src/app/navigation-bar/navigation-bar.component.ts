import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, pipe, Subject } from "rxjs";
import { User } from "../models/user";
import { UserAuthentication } from "../models/user-auth.model";
import { AuthService } from "../services/authentication/auth.service";

@Component({
    selector: "app-navigation-bar",
    templateUrl: "./navigation-bar.component.html",
    styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBar
{
    userDetails$: Observable<UserAuthentication>;

    constructor(private authService: AuthService)
    {
        this.userDetails$ =  this.authService.user;
    }

    onSignOut()
    {
        this.authService.logout();
    }
}
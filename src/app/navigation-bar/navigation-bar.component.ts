import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, pipe, Subject } from "rxjs";
import { User } from "../models/user";
import { AuthService } from "../services/auth.service";

@Component({
    selector: "app-navigation-bar",
    templateUrl: "./navigation-bar.component.html",
    styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBar
{
    userDetails$: Observable<User>;

    constructor(private authService: AuthService)
    {
        this.userDetails$ =  this.authService.user;
    }
}
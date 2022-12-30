import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { UserAuthentication } from "../../models/user-auth.model";
import { AuthService } from "../../services/authentication/auth.service";

@Component({
    selector: "app-user-info",
    templateUrl: "./user-info.component.html",
    styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit
{
    userDetails$: Observable<UserAuthentication>;
    public profileSource: string;

    constructor(private authService: AuthService)
    {
        this.userDetails$ =  this.authService.user;
        this.profileSource = this.authService.currentUserProfilePicture;
    }

    ngOnInit() 
    {
    }
}
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutAuthorComponent } from "./about-author/about-author.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ContactAuthorComponent } from "./contact-author/contact-author.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthGuard } from "./services/authentication/auth.guard";
import { SignInComponent } from "./sign-in/sign-in.component";
import { UserInfoComponent } from "./user-info/user-info.component";
import { UserPortalComponent } from "./user-portal/user-portal.component";
import { WODEditComponent } from "./wod/wod-edit/wod-edit.component";
import { WODComponent } from "./wod/wod.component";

const appRoutes: Routes = [
    {path: 'Home', component: HomeComponent },
    {path: 'SignIn', component: SignInComponent},
    {path: 'User/:id', canActivate: [AuthGuard], component: UserPortalComponent, children: [
        {path: '', component: UserInfoComponent},
        {path: 'WOD/:id', component: WODEditComponent},
        {path: 'WOD/Create', component: WODEditComponent},
        {path: 'ChangePassword', component: ChangePasswordComponent},
    ]},
    {path: 'WOD', component: WODComponent},
    {path: 'About', component: AboutAuthorComponent},
    {path: 'Contact', component: ContactAuthorComponent},
    {path: '', redirectTo: '/Home', pathMatch: 'full'},
    {path: 'NotFound', component: NotFoundComponent},
    {path: '**', redirectTo: '/NotFound'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule
{

}
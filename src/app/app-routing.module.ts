import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutAuthorComponent } from "./about-author/about-author.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ContactAuthorComponent } from "./contact-author/contact-author.component";
import { EmailVerificationComponent } from "./email-verification/email-verification.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { HomeComponent } from "./home/home.component";
import { NotAuthorizedComponent } from "./not-authorized/not-authorized.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { AdminGuard } from "./services/authentication/admin.guard";
import { AuthGuard } from "./services/authentication/auth.guard";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
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
        {path: 'Register', component: SignUpComponent, canActivate: [AdminGuard]},
    ]},
    {path: 'EmailVerification', component: EmailVerificationComponent},
    {path: 'ForgotPassword', component: ForgotPasswordComponent},
    {path: 'ResetPassword', component: ResetPasswordComponent},
    {path: 'WOD', component: WODComponent},
    {path: 'About', component: AboutAuthorComponent},
    {path: 'Contact', component: ContactAuthorComponent},
    {path: '', redirectTo: '/Home', pathMatch: 'full'},
    {path: 'NotFound', component: NotFoundComponent},
    {path: 'NotAuthorized', component: NotAuthorizedComponent},
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
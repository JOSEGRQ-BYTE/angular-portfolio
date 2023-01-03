import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutAuthorComponent } from "./components/about-author/about-author.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { ContactAuthorComponent } from "./components/contact-author/contact-author.component";
import { EmailVerificationComponent } from "./components/email-verification/email-verification.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { HomeComponent } from "./components/home/home.component";
import { NotAuthorizedComponent } from "./components/not-authorized/not-authorized.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { AdminGuard } from "./services/authentication/admin.guard";
import { AuthGuard } from "./services/authentication/auth.guard";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { UserPortalComponent } from "./components/user-portal/user-portal.component";
import { WODEditComponent } from "./components/wod-edit/wod-edit.component";
import { WODComponent } from "./components/wod/wod.component";
import { StrengthTrainingFormComponent } from "./components/strength-training-form/strength-training-form.component";

const appRoutes: Routes = [
    {path: 'Home', component: HomeComponent },
    {path: 'SignIn', component: SignInComponent},
    {path: 'User/:id', canActivate: [AuthGuard], component: UserPortalComponent, children: [
        {path: '', component: UserInfoComponent},
        {path: 'WOD/:id', component: WODEditComponent},
        {path: 'WOD', component: WODEditComponent},
        {path: 'ChangePassword', component: ChangePasswordComponent},
        {path: 'Register', component: SignUpComponent, canActivate: [AdminGuard]},
        {path: 'StrengthTraining/:id', component: StrengthTrainingFormComponent, canActivate: [AdminGuard]},
        {path: 'StrengthTraining', component: StrengthTrainingFormComponent, canActivate: [AdminGuard]},
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
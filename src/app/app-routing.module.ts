import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutAuthorComponent } from "./about-author/about-author.component";
import { ContactAuthorComponent } from "./contact-author/contact-author.component";
import { HomeComponent } from "./home/home.component";
import { BackendComponent } from "./home/skills/back-end/back-end.component";
import { DevelopmentComponent } from "./home/skills/development/development.component";
import { FrameworksComponent } from "./home/skills/frameworks/frameworks.component";
import { FrontendComponent } from "./home/skills/front-end/front-end.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { WODComponent } from "./wod/wod.component";

const appRoutes: Routes = [
    {path: 'Home', component: HomeComponent, children: [
        {path: 'Frontend', component: FrontendComponent},
        {path: 'Backend', component: BackendComponent},
        {path: 'Development', component: DevelopmentComponent},
        {path: 'Frameworks', component: FrameworksComponent}
    ] },
    {path: 'SignIn', component: SignInComponent},
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
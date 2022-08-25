import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutAuthorComponent } from "./about-author/about-author.component";
import { ContactAuthorComponent } from "./contact-author/contact-author.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'About', component: AboutAuthorComponent},
    {path: 'Contact', component: ContactAuthorComponent},
    //{path: '', component: WODComponent},
    {path: 'NotFound', component: NotFoundComponent},
    {path: '**', redirectTo: '/NotFound',}
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
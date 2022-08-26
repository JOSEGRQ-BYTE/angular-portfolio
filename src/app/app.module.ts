import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AboutAuthorComponent } from './about-author/about-author.component';
import { RoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ContactAuthorComponent } from './contact-author/contact-author.component';
import { HeroComponent } from './home/hero/hero.component';
import { HomeComponent } from './home/home.component';
import { SkillComponent } from './home/skills/skills.component';
import { NavigationBar } from './navigation-bar/navigation-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBar,
    HomeComponent,
    AboutAuthorComponent,
    ContactAuthorComponent,
    NotFoundComponent,
    HeroComponent,
    SkillComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

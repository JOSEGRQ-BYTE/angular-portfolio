import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AboutAuthorComponent } from './about-author/about-author.component';
import { RoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ContactAuthorComponent } from './contact-author/contact-author.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './home/hero/hero.component';
import { HomeComponent } from './home/home.component';
import { ProjectCardComponent } from './home/projects/project-card/project-card.component';
import { ProjectsComponent } from './home/projects/projects.component';
import { BackendComponent } from './home/skills/back-end/back-end.component';
import { DevelopmentComponent } from './home/skills/development/development.component';
import { FrameworksComponent } from './home/skills/frameworks/frameworks.component';
import { FrontendComponent } from './home/skills/front-end/front-end.component';
import { SkillsComponent } from './home/skills/skills.component';
import { NavigationBar } from './navigation-bar/navigation-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { WaveDividerComponent } from './wave-divider/wave-divider.component';
import { WODComponent } from './wod/wod.component';
import { HttpClientModule } from '@angular/common/http';
import { WODCardComponent } from './wod/wod-card/wod-card.component';
import { WODEditComponent } from './wod/wod-edit/wod-edit.component';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBar,
    HomeComponent,
    AboutAuthorComponent,
    ContactAuthorComponent,
    NotFoundComponent,
    HeroComponent,
    SkillsComponent,
    ProjectsComponent,
    ProjectCardComponent,
    WaveDividerComponent,
    FooterComponent,
    BackendComponent,
    FrontendComponent,
    FrameworksComponent,
    DevelopmentComponent,
    SignInComponent,
    WODComponent,
    WODCardComponent,
    WODEditComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

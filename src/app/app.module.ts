import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AboutAuthorComponent } from './about-author/about-author.component';
import { RoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ContactAuthorComponent } from './contact-author/contact-author.component';
import { FooterComponent } from './home/footer/footer.component';
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
import { WaveDividerComponent } from './wave-divider/wave-divider.component';


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
    DevelopmentComponent
    
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

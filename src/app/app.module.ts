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
import { SkillsComponent } from './home/skills/skills.component';
import { NavigationBar } from './navigation-bar/navigation-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { WaveDividerComponent } from './wave-divider/wave-divider.component';
import { WODComponent } from './wod/wod.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WODCardComponent } from './wod/wod-card/wod-card.component';
import { WODEditComponent } from './wod/wod-edit/wod-edit.component';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { SkillCard } from './home/skills/skill-card/skill-card.component';
import { ModeToggleComponent } from './shared/mode-toggle/mode-toggle.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';


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
    SignInComponent,
    WODComponent,
    WODCardComponent,
    WODEditComponent,
    SkillCard,
    ModeToggleComponent,
    UserPortalComponent,
    ChangePasswordComponent,
    UserInfoComponent,
    SignUpComponent,
    EmailVerificationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NotAuthorizedComponent
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
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

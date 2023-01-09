import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AboutAuthorComponent } from './components/about-author/about-author.component';
import { RoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ContactAuthorComponent } from './components/contact-author/contact-author.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/home/hero/hero.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectCardComponent } from './components/home/projects/project-card/project-card.component';
import { ProjectsComponent } from './components/home/projects/projects.component';
import { SkillsComponent } from './components/home/skills/skills.component';
import { NavigationBar } from './components/navigation-bar/navigation-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { WODComponent } from './components/wod/wod.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WODCardComponent } from './components/wod-card/wod-card.component';
import { WODEditComponent } from './components/wod-edit/wod-edit.component';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { SkillCard } from './components/home/skills/skill-card/skill-card.component';
import { ModeToggleComponent } from './shared/mode-toggle/mode-toggle.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserPortalComponent } from './components/user-portal/user-portal.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { StrengthTrainingFormComponent } from './components/strength-training-form/strength-training-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortByPropertyPipe } from './shared/utilities/pipes/sort-pipe';

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
    NotAuthorizedComponent,
    StrengthTrainingFormComponent,
    SortByPropertyPipe
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
    MatCardModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

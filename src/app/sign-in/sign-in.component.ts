import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit
{
    public signInForm!: FormGroup;
    private returnUrl!: string;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService)
    {
        this.returnUrl = '/Home';
    }

    ngOnInit()
    {
        this.signInForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required]),
        });

        this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/Home';
    }

    onSignIn()
    {
        if (this.signInForm.invalid)
            return;

        if(this.signInForm.valid)
        {
            this.authService.login(this.signInForm.value)
            .pipe(first())
            .subscribe({
                next: (user) => {
                    this.router.navigate([this.returnUrl]);
                },
                error: (error) => console.error(error),
                complete: () => console.info('complete') 
             });
        }
    }

}
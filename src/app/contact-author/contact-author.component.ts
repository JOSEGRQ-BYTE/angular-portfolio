import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-contact-author",
    templateUrl: "./contact-author.component.html",
    styleUrls: ['./contact-author.component.css'],
})
export class ContactAuthorComponent implements OnInit
{
    public contactForm: FormGroup;

    constructor() 
    {
        this.contactForm = new FormGroup({});
    }

    ngOnInit() 
    {

        this.contactForm = new FormGroup({
            'firstname': new FormControl(null, Validators.required),
            'lastname': new FormControl(null, Validators.required),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'message': new FormControl(null, [Validators.required])
        });

    }

    onSend()
    {
        console.log(this.contactForm);
    }

}
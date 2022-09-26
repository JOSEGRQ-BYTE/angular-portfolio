import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { ContactAuthorForm } from "src/app/models/contact.model";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class ContactAuthorService 
{

    constructor(private http: HttpClient)
    {
    }

    submitContactForm(contactForm: ContactAuthorForm): Observable<string> 
    {
        return this.http.post(`${environment.contactURL}`, contactForm, {responseType: 'text'});
    }
}
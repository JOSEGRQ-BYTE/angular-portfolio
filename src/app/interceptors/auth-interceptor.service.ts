import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";

export class AuthInterceptorService implements HttpInterceptor
{ 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable< HttpEvent<any> > 
    {
        // You can retrict what request you need to modify by the url
        const storedInfo = localStorage.getItem('userDetails'); // you probably want to store it in localStorage or something
        let userDetails: User;

        if(!!storedInfo)
            userDetails = JSON.parse(storedInfo) as User;
        else
            userDetails = {
                email: null,
                firstName: null,
                lastName: null,
                token: null,
                expiration: null,
                isLoggedIn: false
            };

        // Handle Original Request
        if (!userDetails.token)
          return next.handle(request);


        // Clone/Modify Original Request & Append Token
        const modifiedRequest = request.clone({ headers: request.headers.append('Authorization', `Bearer ${userDetails.token}`) });

        console.log(request, 'ORIGINAL');
        console.log(modifiedRequest, 'MODIFIED');


        return next.handle(modifiedRequest);
    }
}
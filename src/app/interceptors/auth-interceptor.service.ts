import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { UserAuthentication } from "../models/user-auth.model";

export class AuthInterceptorService implements HttpInterceptor
{ 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable< HttpEvent<any> > 
    {
        // You can retrict what request you need to modify by the url
        const storedInfo = localStorage.getItem('userDetails');
        let userDetails: UserAuthentication;

        if(!!storedInfo)
            userDetails = JSON.parse(storedInfo) as UserAuthentication;
        else
            userDetails = new UserAuthentication(null, null, null, null, null, false);

        // Handle Original Request
        if (!userDetails.token)
          return next.handle(request);


        // Clone/Modify Original Request & Append Token
        //const modifiedRequest = request.clone({ params: new HttpParams().set('Authorization', `Bearer ${userDetails.token}`) });


        const modifiedRequest = request.clone({
            setHeaders: {
            Authorization: `Bearer ${userDetails.token}`,
            //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
            });

        console.log(request, 'ORIGINAL');
        console.log(modifiedRequest, 'MODIFIED');


        return next.handle(modifiedRequest);
    }
}
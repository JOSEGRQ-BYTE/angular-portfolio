import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { User } from "../../models/user";
import { environment } from '../../../environments/environment';
import { UserAuthentication } from "src/app/models/user-auth.model";
import { ChangePasswordFailedResponse, ChangePasswordResponse } from "src/app/models/change-password-failure.model";
import { ChangePassword } from "src/app/models/change-password.model";
import { Register } from "src/app/models/register.model";
import { ResetPassword } from "src/app/models/reset-password.model";




@Injectable({ providedIn: 'root' })
export class AuthService 
{
    private userSubject: BehaviorSubject<UserAuthentication>;
    public user: Observable<UserAuthentication>;

    constructor(private http: HttpClient)
    {
        // Current local storage has user data
        const currentUserInfo = localStorage.getItem('userDetails');
        if(!!currentUserInfo)
        {
            const userInfo: UserAuthentication = JSON.parse(currentUserInfo);
            this.userSubject = new BehaviorSubject<UserAuthentication>(userInfo);
        }
        // Set nullable data when token does not exist
        else
        {
            this.userSubject = new BehaviorSubject(new UserAuthentication(null, null, null, null, null, null, false));
        }

        // Set user to be the observable
        this.user = this.userSubject.asObservable();
    }

    // Get current value of user subject
    public get currentUserValue(): UserAuthentication
    {
        return this.userSubject.value;
    }

    // Take in user info and return observable user
    public login(userInfo: {email: string, password: string}): Observable<UserAuthentication>
    {
        return this.http.post<UserAuthentication>(`${environment.usersURL}/LoginUser`, userInfo)

            // Manipulate Data as needed
            .pipe(
                tap( // Log the result or error
                {
                  next: (data) => console.log(data, 'HERE 1'),
                  error: (error) => console.log(error, 'HERE 2')
                }
                ),
                map(user => 
                {
                    localStorage.setItem('userDetails', JSON.stringify(user));

                    // Notify subscribers of change
                    this.userSubject.next(user as UserAuthentication);

                    return user;
                })
            );
    }

    // Delete/remove JWT token from local storage
    public logout(): void
    {
        localStorage.removeItem('userDetails');
        this.userSubject.next(new UserAuthentication(null, null, null, null, null, null, false));
    }

    public register(model: Register): Observable<Register> 
    {
        return this.http.post<Register>(`${environment.usersURL}/SignUpUser`, model)
        .pipe(
            tap( // Log the result or error
            {
              next: (data) => console.log(data, 'HERE 5'),
              error: (error) => console.log(error, 'HERE 6')
            }
            )
        );

    }

    public confirmEmail(token: string, email: string): Observable<string>
    {

        const params = new HttpParams()
        .set('token', token)
        .set('email', email);

        return this.http.get<string>(`${environment.usersURL}/ConfirmEmail`, {params})
        .pipe(tap( {
            next: (data) => console.log(data, 'ConfirmEmail good'),
            error: (error) => console.log(error, 'ConfirmEmail')
          }));
    }

    // Allows the user to change/update their current password
    public changePassword(changes: ChangePassword): Observable<string>
    {
        let httpHeaders = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Cache-Control': 'no-cache'
        });
        //const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        return this.http.post<string>(`${environment.usersURL}/ChangePassword`, changes, { headers: httpHeaders, responseType: 'json'});
        /*.pipe(
            tap( // Log the result or error
            {
              next: (data) => console.log(data, 'HERE'),
              error: (error) => console.log(error, 'HERE')
            }
            )
          );*/
    }

    public forgotPassword(email: string): Observable<string>
    {

        console.log(email, "INSIDE")
        const params = new HttpParams()
        .set('email', email);

        return this.http.get<string>(`${environment.usersURL}/ForgotPassword`, {params});
    }

    public resetPassword(model: ResetPassword): Observable<string>
    {
        return this.http.post<string>(`${environment.usersURL}/ResetPassword`, model)
        .pipe(
            tap(
            {
              next: (data) => console.log(data, 'RESET GOOD'),
              error: (error) => console.log(error, 'RESET BAD')
            }
            )
        );
    }

}
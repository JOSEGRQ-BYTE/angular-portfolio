import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { User } from "../../models/user";
import { environment } from '../../../environments/environment';
import { UserAuthentication } from "src/app/models/user-auth.model";

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
            this.userSubject = new BehaviorSubject(new UserAuthentication(null, null, null, null, null, false));
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
        this.userSubject.next(new UserAuthentication(null, null, null, null, null, false));
    }
}
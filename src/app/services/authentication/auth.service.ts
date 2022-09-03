import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { User } from "../../models/user";
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService 
{
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(private http: HttpClient)
    {
        // Current local storage has user data
        const currentUserInfo = localStorage.getItem('userDetails');
        if(!!currentUserInfo)
        {
            const userInfo: User = JSON.parse(currentUserInfo);
            this.userSubject = new BehaviorSubject<User>(userInfo);
        }
        // Set nullable data when token does not exist
        else
        {
            this.userSubject = new BehaviorSubject({
                email: null,
                firstName: null,
                lastName: null,
                token: null,
                expiration: null,
                isLoggedIn: false
            } as User);
        }

        // Set user to be the observable
        this.user = this.userSubject.asObservable();
    }

    // Get current value of user subject
    public get currentUserValue(): User
    {
        return this.userSubject.value;
    }

    // Take in user info and return observable user
    public login(userInfo: {email: string, password: string}): Observable<User>
    {
        return this.http.post<User>(`${environment.usersURL}/LoginUser`, userInfo)

            // Manipulate Data as needed
            .pipe(
                map(user => {
                    localStorage.setItem('userDetails', JSON.stringify(user));

                    // Notify subscribers of change
                    this.userSubject.next(user as User);
                    return user;
                })
            );
    }

    // Delete/remove JWT token from local storage
    public logout(): void
    {
        localStorage.removeItem('userDetails');
        this.userSubject.next({
            email: null,
            firstName: null,
            lastName: null,
            token: null,
            expiration: null,
            isLoggedIn: false
        });
    }
}
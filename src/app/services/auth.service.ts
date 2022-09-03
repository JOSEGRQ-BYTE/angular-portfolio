import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { User } from "../models/user";
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService 
{

    private userSubject!: BehaviorSubject<User>;
    public user!: Observable<User>;
    //public readonly todos: Observable<boolean> = this.userSubject..asObservable();


    constructor(private http: HttpClient)
    {
        this.userSubject = new BehaviorSubject({
            email: null,
            firstName: null,
            lastName: null,
            token: null,
            expiration: null,
            isLoggedIn: false
        } as User);

        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userDetails') as string));
        this.user = this.userSubject.asObservable();
    }

    public get currentUserValue(): User
    {
        return this.userSubject.value;
    }

    public login(userInfo: {email: string, password: string}): Observable<User>
    {
        return this.http.post<User>(`${environment.usersURL}/LoginUser`, userInfo)

            // Manipulate Data as needed
            .pipe(
                map(user => {
                    console.log(user);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('userDetails', JSON.stringify(user));
                    this.userSubject.next(user as User);
                    return user;
                })
            );
    }

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
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
    private userProfilePicture : BehaviorSubject<string>;


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
            this.userSubject = new BehaviorSubject(new UserAuthentication(null, null, null, null, null, null, false, false, null));
        }


        // Current local storage has user data
        const profilePicture = localStorage.getItem('userProfilePicture');
        if(!!profilePicture)
        {
            this.userProfilePicture = new BehaviorSubject<string>(profilePicture);
        }
        // Set nullable data when token does not exist
        else
        {
            this.userProfilePicture = new BehaviorSubject('');
        }

        // Set user to be the observable
        this.user = this.userSubject.asObservable();
    }

    // Get current value of user subject
    public get currentUserValue(): UserAuthentication
    {
        return this.userSubject.getValue();
    }

    public get currentUserProfilePicture(): string 
    {
        return this.userProfilePicture.getValue();
    }

    // Take in user info and return observable user
    public login(userInfo: {email: string, password: string}): Observable<UserAuthentication>
    {
        return this.http.post<UserAuthentication>(`${environment.usersURL}/LoginUser`, userInfo)
        // Manipulate Data as needed
        .pipe
        (
            map(user => 
            {
                localStorage.setItem('userDetails', JSON.stringify(user));
                this.userSubject.next(user as UserAuthentication);
                return user;
            })
        );
    }

    // Delete/remove JWT token from local storage
    public logout(): void
    {
        localStorage.removeItem('userDetails');
        localStorage.removeItem('userProfilePicture');
        this.userProfilePicture.next('');
        this.userSubject.next(new UserAuthentication(null, null, null, null, null, null, false, false, null));
    }

    public register(model: Register): Observable<Register> 
    {
        // Create Form with Profile
        let formData = new FormData();
        formData.append('role', model.role);
        formData.append('firstName', model.firstName);
        formData.append('lastName', model.lastName);
        formData.append('email', model.email);
        formData.append('password', model.password);
        formData.append('confirmPassword', model.confirmPassword);
        formData.append('profilePicture', model.profilePicture);

        return this.http.post<Register>(`${environment.usersURL}/SignUpUser`, formData);
    }

    public confirmEmail(token: string, email: string): Observable<string>
    {
        const params = new HttpParams()
        .set('token', token)
        .set('email', email);

        return this.http.get<string>(`${environment.usersURL}/ConfirmEmail`, {params});
    }

    // Allows the user to change/update their current password
    public changePassword(changes: ChangePassword): Observable<string>
    {
        let httpHeaders = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Cache-Control': 'no-cache'
        });

        return this.http.post<string>(`${environment.usersURL}/ChangePassword`, changes, { headers: httpHeaders, responseType: 'json'});
    }

    public forgotPassword(email: string): Observable<string>
    {
        const params = new HttpParams()
        .set('email', email);

        return this.http.get<string>(`${environment.usersURL}/ForgotPassword`, {params});
    }

    public resetPassword(model: ResetPassword): Observable<string>
    {
        return this.http.post<string>(`${environment.usersURL}/ResetPassword`, model);
    }

    public downloadProfilePicture(): Observable<void>
    {
        let queryParams = new HttpParams();
        queryParams = queryParams.append("relativePath", this.currentUserValue.profilePictureURL?? "/");

        return this.http.get(`${environment.usersURL}/DownloadProfilePicture`,{params:queryParams, responseType: 'blob'})
        .pipe(
            map((res: Blob) => 
            {
                // Turn Blob into file
                const myFile = new File([res], `${this.currentUserValue.firstName}-profile-picture`, {
                    type: res.type,
                });

                const reader = new FileReader();

                reader.readAsDataURL(res);

                reader.onload = () => 
                {
                    const base64String = reader.result as string;
                    localStorage.setItem('userProfilePicture', base64String);
                    this.userProfilePicture.next(base64String);

                };
            })
        );
    }

}
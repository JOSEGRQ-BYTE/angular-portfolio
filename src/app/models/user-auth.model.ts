export class UserAuthentication 
{
    constructor(public id:string | null, public email:string | null, public firstName:string | null, public lastName:string | null, private _token: string | null, private expiration: string | null, private _isLoggedIn: boolean)
    {

    }

    get token()
    {
        // If we have no token or it has expired
        if(!this.expiration || new Date() > new Date(this.expiration))
            return null;

        return this._token;
    }


    get isLoggedIn()
    {
        if(!this.expiration || new Date() > new Date(this.expiration))
            return false;

        return this._isLoggedIn;
    }
}
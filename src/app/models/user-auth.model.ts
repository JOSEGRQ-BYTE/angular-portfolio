export class UserAuthentication 
{
    constructor(
        public id:string | null, 
        public email:string | null, 
        public firstName:string | null, 
        public lastName:string | null, 
        private _token: string | null, 
        public expiration: string | null, 
        private _isLoggedIn: boolean,
        private _isAdministrator: boolean,
        private _profilePictureURL: string | null

        )
    {

    }
    get profilePictureURL(): string | null
    {
        if(!this.expiration || new Date() > new Date(this.expiration))
            return null;
    
        return this._profilePictureURL;
    }

    get isAdministrator(): boolean
    {
        if(!this.expiration || new Date() > new Date(this.expiration))
            return false;
    
        return this._isAdministrator;
    }

    get token()
    {
        // If we have no token or it has expired
        if(!this.expiration || new Date() > new Date(this.expiration))
            return null;

        return this._token;
    }


    get isLoggedIn(): boolean
    {
        if(!this.expiration || new Date() > new Date(this.expiration))
            return false;

        return this._isLoggedIn;
    }
}
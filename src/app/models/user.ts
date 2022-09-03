export interface User {
    //id: number;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    token: string | null;
    expiration: Date | null;
    isLoggedIn: boolean;
}
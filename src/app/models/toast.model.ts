export enum ToastType 
{
    NON,
    ERROR,
    SUCCESS,
    WARNING,
    NOTIFICATION,
}

export interface Toast 
{
    header: string,
    body: string,
    type: ToastType
}
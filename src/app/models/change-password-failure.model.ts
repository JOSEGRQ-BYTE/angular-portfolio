export interface ChangePasswordFailedResponse {
    type: string,
    title: string,
    status: number,
    traceId: string,
    errors: { [key: string]: string[] }
}
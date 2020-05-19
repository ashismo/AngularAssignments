import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered? : boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    constructor(private http: HttpClient) {}
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLvKMvaGguOPxPCZhZYKqKGGPo97A8L40',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLvKMvaGguOPxPCZhZYKqKGGPo97A8L40',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMsg = 'An error occured!';
        if(!errorRes.error || !errorRes.error.error) {
            return throwError(errorMsg);
        }
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMsg = "Email already exists!";
                break;
            case 'INVALID_PASSWORD':
                errorMsg = "Invalid password";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMsg = 'Email address not found';
                break;
            default:
                errorMsg = 'An error occured!';
                break;
        }
        return throwError(errorMsg);
    }
}
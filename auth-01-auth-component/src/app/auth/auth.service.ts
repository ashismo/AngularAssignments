import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';

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
    
    user = new Subject<User>();

    constructor(private http: HttpClient) {}
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAdLV9xvX61-or33d4c4BTF32HrP9uCgSI',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), 
            tap(
                respData => {
                    this.handleAuthentication(
                        respData.email, 
                        respData.localId, 
                        respData.idToken, 
                        +respData.expiresIn);
                }
            )
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAdLV9xvX61-or33d4c4BTF32HrP9uCgSI',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError),
            tap(
                respData => {
                    this.handleAuthentication(
                        respData.email, 
                        respData.localId, 
                        respData.idToken, 
                        +respData.expiresIn);
                }
            )
        );
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

    private handleAuthentication(email: string, userid: string, token: string, expiresIn: number) {
        const expDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email, 
            userid, 
            token, 
            expDate
        );
        this.user.next(user);
    }
}
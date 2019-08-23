import { Injectable } from '@angular/core';
import { GlobalService } from '../app.globals';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Signup, Signin } from './auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private globalsService: GlobalService, private httpClinet: HttpClient) { }

    signup(signup: Signup) {
        console.log(signup)
        return this.httpClinet.post(this.globalsService.apiUrl + 'users/signup',
            signup).pipe(catchError(this.errorHandler));
    }
    signin(signin: Signin) {
        return this.httpClinet.post(this.globalsService.apiUrl + 'users/login',
            signin).pipe(catchError(this.errorHandler));
    }

    getToken() {
        const token = localStorage.getItem('auth-token');
        return token;
    }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error);
    }
}

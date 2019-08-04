import { Injectable } from '@angular/core';
import { GlobalService } from '../app.globals';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private globalsService: GlobalService, private httpClinet: HttpClient) { }

    signup({ email, password }) {
        return this.httpClinet.post(this.globalsService.apiUrl + 'users/signup' ,
            { email, password })
        .pipe(catchError(this.errorHandler));

            
    }
            signin({ email, password }) {
                return this.httpClinet.post(this.globalsService.apiUrl + 'users/login',
                    { email, password })
                    .pipe(catchError(this.errorHandler));

    }




errorHandler(error : HttpErrorResponse)  {
    return throwError(error);
}  
}
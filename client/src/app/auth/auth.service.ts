import { Injectable } from '@angular/core';
import { GlobalService } from '../app.globals';
import { HttpClient } from '@angular/common/http';
import { Signup, Signin } from './auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private globalsService: GlobalService, private httpClinet: HttpClient) { }

    signup(signup: Signup) {
        console.log(signup)
        return this.httpClinet.post(this.globalsService.apiUrl + 'users/signup',
            signup);
    }
            signin(signin: Signin) {
                return this.httpClinet.post(this.globalsService.apiUrl + 'users/login',
                    signin);
    }
}
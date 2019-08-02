import { Injectable } from '@angular/core';
import { GlobalService } from '../app.globals';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private globalsService: GlobalService, private httpClinet: HttpClient) { }

    signup({ username, password }) {
        return this.httpClinet.post(this.globalsService.apiUrl + 'users/signup',
            { username, password });
    }
            signin({ username, password }) {
                return this.httpClinet.post(this.globalsService.apiUrl + 'users/login',
                    { username, password });
    }
}
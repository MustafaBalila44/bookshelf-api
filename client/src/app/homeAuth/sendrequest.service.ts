import { Injectable } from '@angular/core';
import { GlobalService } from '../app.globals';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Requestbook } from './request';
@Injectable({
  providedIn: 'root'
})
export class SendrequestService {

  constructor(private globalsService: GlobalService, private httpClinet: HttpClient) { }

  Requestbook(Requestbook: Requestbook) {
      console.log(Requestbook)
      return this.httpClinet.post(this.globalsService.apiUrl + 'users/signup',
      Requestbook);
  }
}

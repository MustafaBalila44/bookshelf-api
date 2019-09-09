import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

   // readonly apiUrl = 'https://bookshelf5000.herokuapp.com/api/';
     readonly apiUrl = 'http://192.168.98.248:8000/api/';
}

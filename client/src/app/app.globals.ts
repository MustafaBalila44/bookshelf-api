import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

    readonly apiUrl = 'http://bookshelf5000.herokuapp.com/api/'
}
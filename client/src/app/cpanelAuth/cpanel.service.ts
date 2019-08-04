import { Injectable } from '@angular/core';
import { GlobalService } from '../app.globals';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Book } from '../cpanelAuth/cpanelclass';
@Injectable({
  providedIn: 'root'
})
export class CpanelService {

  constructor(private globalsService: GlobalService, private httpClinet: HttpClient) { }


  addBook(book: Book) {
    console.log(book)
    return this.httpClinet.post(this.globalsService.apiUrl + 'books/create', book);
  }

  getBooks() {

  }


}


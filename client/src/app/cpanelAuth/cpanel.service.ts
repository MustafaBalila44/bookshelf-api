import { Injectable } from '@angular/core';
import { GlobalService } from '../app.globals';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Book } from '../cpanelAuth/cpanelclass';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CpanelService {

  constructor(private globalsService: GlobalService, private httpClinet: HttpClient) { }


  addBook(book: Book) {
    console.log(book)
    return this.httpClinet.post(this.globalsService.apiUrl + 'books/create', book);
  }

  getBooks(): Observable<Book[]> {
    return this.httpClinet.get<Book[]>(this.globalsService.apiUrl + 'books');
  }

  getBook(id): Observable<Book> {
    return this.httpClinet.get<Book>(this.globalsService.apiUrl + 'books/' + id);
  }


}

 
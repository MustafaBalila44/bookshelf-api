import { Injectable } from '@angular/core';
import { GlobalService } from '../app.globals';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Book, Author } from '../cpanelAuth/cpanelclass';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CpanelService {

  constructor(private globalsService: GlobalService, private httpClinet: HttpClient) { }


  addBook(book: Book) {
    return this.httpClinet.post(this.globalsService.apiUrl + 'books/create', book);
  }

  getBooks(): Observable<{ books: Book[] }> {
    return this.httpClinet.get<{ books: Book[] }>(this.globalsService.apiUrl + 'books');
  }

  addAuthor(author: Author) {
    return this.httpClinet.post(this.globalsService.apiUrl + 'authors/create', author);
  }

  getAuthors(): Observable<{ authors: Author[] }> {
    return this.httpClinet.get<{ authors: Author[] }>(this.globalsService.apiUrl + 'authors');
  }

  getBook(id): Observable<{ book: Book }> {
    return this.httpClinet.get<{ book: Book }>(this.globalsService.apiUrl + 'books/' + id);
  }

}


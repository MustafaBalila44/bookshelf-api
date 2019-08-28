import { Component, OnInit } from '@angular/core';
import { Book, Author } from '../cpanelclass';
import { CpanelService } from '../cpanel.service';

@Component({
  selector: 'app-cpanel',
  templateUrl: './cpanel.component.html',
  styleUrls: ['./cpanel.component.css']
})
export class CpanelComponent implements OnInit {
  // variable name : type = value
  book: Book = new Book();
  author: Author = new Author();
  authors: Author[] = [];
  constructor(private cpanelService : CpanelService) { }

  ngOnInit() {
    this.cpanelService.getAuthors().subscribe(response => {
      this.authors = response.authors;
    });
  }


  onAddBook() {
    this.cpanelService.addBook(this.book).subscribe((response) => {
      console.log(response);
     });
  }

  onAddAuthor() {
    this.cpanelService.addAuthor(this.author).subscribe((response) => {
      console.log(response);
     });
  }

  onAddUserPoints() {
    this.cpanelService.addBook(this.book).subscribe((response) => {
      console.log(response);
     });
  }

  onAddPonits() {

  }
}

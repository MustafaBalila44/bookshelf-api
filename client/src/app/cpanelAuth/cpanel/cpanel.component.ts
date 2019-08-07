import { Component, OnInit } from '@angular/core';
import { Book } from '../cpanelclass';
import { CpanelService } from '../cpanel.service';

@Component({
  selector: 'app-cpanel',
  templateUrl: './cpanel.component.html',
  styleUrls: ['./cpanel.component.css']
})
export class CpanelComponent implements OnInit {
  // variable name : type = value
  book: Book = new Book();
  constructor(private cpanelService : CpanelService) { }

  ngOnInit() {
  }


  onSubmit(form) {
    this.book.author = "5d4722bfd249e427880b11bc";
    this.cpanelService.addBook(this.book).subscribe((response) => {
      console.log(response);

     } )
  }




}

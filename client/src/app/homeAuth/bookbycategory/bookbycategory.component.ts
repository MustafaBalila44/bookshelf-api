import { Component, OnInit } from '@angular/core';
import { CpanelService } from '../../cpanelAuth/cpanel.service';
import { Book } from '../../cpanelAuth/cpanelclass';

@Component({
  selector: 'app-bookbycategory',
  templateUrl: './bookbycategory.component.html',
  styleUrls: ['./bookbycategory.component.css']
})
export class BookbycategoryComponent implements OnInit {
  booksById : Book[] = [];

  constructor( private cpanel : CpanelService) { }

  ngOnInit() {

    this.cpanel.getBooksbycategory(1).subscribe((res)=>{
console.log(res);
this.booksById = res;
    })
    
  }

}

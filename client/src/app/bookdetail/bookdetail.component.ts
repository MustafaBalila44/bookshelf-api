import { Component, OnInit } from '@angular/core';
import {SendrequestService} from '../homeAuth/sendrequest.service'
import { Book } from '../cpanelAuth/cpanelclass';
import { CpanelService } from '../cpanelAuth/cpanel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.css']
})
export class BookdetailComponent implements OnInit {
  book: Book = new Book();
  constructor(private sendrequestService : SendrequestService , private cpanelService: CpanelService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cpanelService.getBook(params.id).subscribe((res: any) => {
        console.log(res.book)
        this.book = res.book;
      }, (err) => {
        console.log(err);
      })

    })
  }



  addToCart(bookId){
    const userId = localStorage.getItem("_id");
    this.sendrequestService.addToCart(userId, bookId).subscribe((res) => {
  
    }, (err) => {
      
    }) 
  }
}

import { Component, OnInit } from '@angular/core';
import {SendrequestService} from '../homeAuth/sendrequest.service'
import { Book } from '../cpanelAuth/cpanelclass';
import { CpanelService } from '../cpanelAuth/cpanel.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.css']
})
export class BookdetailComponent implements OnInit {
  book: Book = new Book();
  constructor(
  private sendrequestService : SendrequestService , 
  private cpanelService: CpanelService, 
  private route: ActivatedRoute,
  private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cpanelService.getBook(params.id).subscribe((res: any) => {
        this.book = res.book;
      }, (err) => {
        console.log(err);
      })

    })
  }



  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  addToCart(bookId) {
    const userId = localStorage.getItem('_id');
    this.sendrequestService.addToCart(userId, bookId).subscribe((res) => {
      this.openSnackBar('The book was added');
    }, (err) => {
      console.log(err);
    });
  }

}

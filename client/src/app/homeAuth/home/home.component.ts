import { Component, OnInit } from '@angular/core';
import { Requestbook } from '../request';
import { SendrequestService } from '../sendrequest.service'
import { Book } from '../../cpanelAuth/cpanelclass';
import { CpanelService } from '../../cpanelAuth/cpanel.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  request: Requestbook = new Requestbook();
  books: Book[] = [];
  constructor(
    private sendrequestService: SendrequestService,
    private cpanelService: CpanelService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.cpanelService.getBooks().subscribe((res) => {
      this.books = res.books;
    }, (err) => {
      console.log(err);
    });
  }

  onSubmit(form) {

    this.sendrequestService.Requestbook(this.request).subscribe((response) => {
      console.log(response);

    })




  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
    });
  }
  addToCart(bookId) {

    const userId = localStorage.getItem("_id");
    this.sendrequestService.addToCart(userId, bookId).subscribe((res) => {

    }, (err) => {

    })
  }


  openBook(bookId) {
    this.router.navigate(['/user', 'bookdetail', "5d4722c5d249e427880b11bd"]);

  }
}





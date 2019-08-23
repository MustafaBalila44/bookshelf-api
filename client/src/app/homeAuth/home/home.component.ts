import { Component, OnInit } from '@angular/core';
import { Requestbook } from '../request';
import { SendrequestService } from '../sendrequest.service'
import { Book } from '../../cpanelAuth/cpanelclass';
import { CpanelService } from '../../cpanelAuth/cpanel.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from 'src/app/shared/UI.service';

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
    private snackBar: MatSnackBar,
    private ui: UIService,
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

    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  addToCart(bookId) {
    this.ui.loadingStateChanged.next(true);
    const userId = localStorage.getItem('_id');
    this.sendrequestService.addToCart(userId, bookId).subscribe((res) => {
      this.ui.loadingStateChanged.next(false);
      this.openSnackBar('The book was added');
    }, (err) => {
      console.log(err);
    });
  }


  openBook(bookId) {
    this.router.navigate(['/user', 'bookdetail', bookId]);
  }
}





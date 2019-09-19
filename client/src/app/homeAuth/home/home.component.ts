import { Component, OnInit } from '@angular/core';
import { Requestbook } from '../request';
import { SendrequestService } from '../sendrequest.service'
import { Book } from '../../cpanelAuth/cpanelclass';
import { CpanelService } from '../../cpanelAuth/cpanel.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from 'src/app/shared/UI.service';
import { AuthService } from '../../auth/auth.service'
import { BasketService } from '../../basket/basket.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //user score
 // user : User = new this.user();
 user = {} as any;
 request: Requestbook = new Requestbook();
  books: Book[] = [];
  riwayat : Book[] = [];
  a : Book[] = [];
  b : Book[] = [];
  c : Book[] = [];
  d : Book[] = [];
  e : Book[] = [];
  f : Book[] = [];
  g : Book[] = [];

  bookLength : number;
  constructor(
    private sendrequestService: SendrequestService,
    private cpanelService: CpanelService,
    private router: Router,
    private snackBar: MatSnackBar,
    private ui: UIService,
    private auth : AuthService,
    private basket : BasketService
  ) { }

  ngOnInit() {
    this.auth.getLoggedInUser().subscribe((response: any) => {
      console.log(response)
      this.user = response.user;
    }, (err: any) => {
      console.log(err);
    });
    

    this.cpanelService.getBooks().subscribe((res) => {
      this.books = res.books;
      
    }, (err) => {
      console.log(err);
    });
      
  
    
    this.cpanelService.getBooksbycategory(1).subscribe((res: any[]) => {
      this.riwayat = res.slice(0,8);
    }, (err) => {
      console.log(err);
    });
    
    this.cpanelService.getBooksbycategory(2).subscribe((res: any[]) => {
      this.a = res.slice(0,8);
    }, (err) => {
      console.log(err);
    });

    this.cpanelService.getBooksbycategory(3).subscribe((res: any[]) => {
      this.b = res.slice(0,8);
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

  addToCartCheck(bookId: string) {
    this.basket.getCart().subscribe((res: any)=>{
      
      const cart = res.cart;
      
      const booksIds = cart.books.reduce((a, book) => {
        a.push(book._id);
        return a;
       
      }, []);
      if (booksIds.includes(bookId)) {
        this.openSnackBar('The book already exsists');
        return ;      
      }
      this.addToCart(bookId);
     
    });
  }
  // م مفروض يقدر يضيف الكتاب مرتين 
  // اي كتاب منو نسحة واحدة بس
  addToCart(bookId) {
    this.ui.loadingStateChanged.next(true);
    const userId = localStorage.getItem('_id');
    this.sendrequestService.addToCart(userId, bookId).subscribe((res) => {
      this.ui.loadingStateChanged.next(false);
      this.openSnackBar('The book was added');
      this.basket.getbookLength();
    }, (err) => {
      console.log(err);
    });
    
  }


  openBook(bookId) {
    this.router.navigate(['/user', 'bookdetail', bookId]);
  }
}





import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service'
import { BasketService } from '../basket/basket.service';
import { Cart } from '../basket/basket.model';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})

export class ChildComponent implements OnInit {
  bookLength: number;
  order : string = ''; 
  noti : number ;
  cart = new Cart();

  navbarOpen = false;
  sticky = true;
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(public auth : AuthService , private cartService : BasketService) { }
  
  ngOnInit() {

    this.cartService.getCart().subscribe((response: any) => {
      this.cart = response.cart;
      this.bookLength = this.cart.books.length
      })

  }



  signout(){
    this.auth.logoutUser();
  }

}




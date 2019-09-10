import { Component, OnInit , } from '@angular/core';
import { Order } from '../checkoutpurchase/order';
import { Router, ActivatedRoute } from '@angular/router';
import { Cart } from '../basket/basket.model';
import { BasketService } from '../basket/basket.service';
import { AuthService } from '../auth/auth.service';




@Component({
  selector: 'app-checkoutexchange',
  templateUrl: './checkoutexchange.component.html',
  styleUrls: ['./checkoutexchange.component.css']
})
export class CheckoutexchangeComponent implements OnInit {
  user = {} as any;
  cart = new Cart();
  bookscount :number = 0;
  param: number; 
  order = new Order();

   constructor(private router : Router , private route: ActivatedRoute , private cartService : BasketService , private auth : AuthService ) { }
 
     ngOnInit() {
     this.route.queryParams
     .subscribe(params => {
       console.log(params); // {order: "popular"}

       this.bookscount = params.bookscount;
       console.log(this.bookscount); // popular
     });
     this.auth.getLoggedInUser().subscribe((response: any) => {
      console.log(response)
      this.user = response.user;
    }, (err: any) => {
      console.log(err);
    });
  
     }

     onsubmit() {
    /*  this.order.booksCount= this.cart.books.length;
  console.log(this.order);
  */
      this.cartService.order(this.order).subscribe((res:any) =>{
  console.log(res);
  this.router.navigate(['/user/status/']);
  
  
  
      })
    
  
  }
 

 
 }
 
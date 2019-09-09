import { HostListener, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { BasketService } from '../basket/basket.service';
import { Cart } from '../basket/basket.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from './order';

@Component({
  selector: 'app-checkoutpurchase',
  templateUrl: './checkoutpurchase.component.html',
  styleUrls: ['./checkoutpurchase.component.css']
})
export class CheckoutpurchaseComponent implements OnInit {

  user = {} as any;
  cart = new Cart();
  payment = { cash: false, points: false };
  param: any;
  xpPrice = 0;
  sdgPrice = 0;
  order = new Order();

  constructor(private router: Router, private authService: AuthService, private cartService: BasketService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.param = params.payment;
      this.payment[this.param] = true;
    })


    this.cartService.getCart().subscribe((response: any) => {
      this.cart = response.cart;
      const { sdg, xp } = response.cart.books.reduce((all: any, item: any) => ({
        sdg: all.sdg + item.priceSdg,
        xp: all.xp + item.priceXp
      }),
        { sdg: 0, xp: 0 });
      this.sdgPrice = sdg;
      this.xpPrice = xp;

      if (this.payment['cash']) {
        this.order.priceSDG = sdg;;
        this.order.priceXP = 0;
        this.order.totalPrice = 60 + sdg;
      }
      if (this.payment['points']) {
        this.order.priceSDG = 0;
        this.order.priceXP = xp;
        this.order.totalPrice = 60;
      }

    }, (err: any) => {
      console.log(err);
    });

    this.authService.getLoggedInUser().subscribe((response: any) => {
      console.log(response)
      this.user = response.user;
    }, (err: any) => {
      console.log(err);
    });

  }

  onsubmit() {
    this.order.booksCount= this.cart.books.length;
    this.cartService.order(this.order).subscribe((res:any) =>{
console.log(res);
    })
  }

}

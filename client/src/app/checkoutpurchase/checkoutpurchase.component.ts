import { HostListener,Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { BasketService } from '../basket/basket.service';
import { Cart } from '../basket/basket.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkoutpurchase',
  templateUrl: './checkoutpurchase.component.html',
  styleUrls: ['./checkoutpurchase.component.css']
})
export class CheckoutpurchaseComponent implements OnInit {

  user = {} as any;
  cart = new Cart();
  xpPrice = 0;
  sdgPrice = 0;
  @HostListener('window:onreload') goToPage() {
    this.router.navigate(['/user/basket']);

  }
  constructor(private router : Router ,private authService: AuthService, private cartService: BasketService) { }

  ngOnInit() {

    
    this.cartService.getCart().subscribe((response: any) => {
      this.cart = response.cart;
      const { sdg, xp } = response.cart.books.reduce((all: any, item: any) => ({
        sdg: all.sdg + item.priceSdg,
        xp: all.xp + item.priceXp
      }),
        { sdg: 0, xp: 0 });
      this.sdgPrice = sdg;
      this.xpPrice = xp;
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



 
}

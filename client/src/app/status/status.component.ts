


import {Component, OnInit , ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Order } from '../checkoutpurchase/order';
import { BasketService } from '../basket/basket.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
 
})

export class  StatusComponent implements OnInit {
  user = {} as any;
  order = {} as any;

  value1 = 33;
  bufferValue1 = 40;

  value2 = 33;
  bufferValue2 = 40;
  mode = 'buffer';
  
  /*
  isLinear = false;

  isEditable = false;
  com = true;
  */
  constructor(private cart: BasketService , private authService : AuthService) {
  }

  ngOnInit() {
    this.cart.getbookLength();
    this.authService.getLoggedInUser().subscribe((response: any) => {
      console.log(response)
      this.user = response.user;
    }, (err: any) => {
      console.log(err);
    });
this.cart.getorder().subscribe((res:any) =>
{
  console.log(res)
  this.order= res.orders;
  console.log(this.order)

}
)

  }

}

















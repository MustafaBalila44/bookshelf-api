


import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../checkoutpurchase/order';
import { BasketService } from '../basket/basket.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],

})

export class StatusComponent implements OnInit {
  user = {} as any;
  order: Order[] = [];
  trading = {} as any;
  value1 = 0;
  bufferValue1 = 0;

  value2 = 0;
  bufferValue2 = 0;
  mode = 'buffer';
  delivery = 60;
  /*
  isLinear = false;

  isEditable = false;
  com = true;
  */

  constructor(private cart: BasketService, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getLoggedInUser().subscribe((response: any) => {
      console.log(response)

      this.user = response.user;
      console.log(this.user.address.locallity)
      if (this.user.address.locallity == "جبل اولياء") {
        this.delivery = 95;
    }
    if (this.user.address.locallity == "بحري") {
        this.delivery = 65;
    }
    if (this.user.address.locallity == "ام درمان") {
        this.delivery = 85;
    }
    if (this.user.address.locallity == "شرق النيل") {
        this.delivery = 85;
    }
    if (this.user.address.locallity == "ام بدة") {
        this.delivery = 95;
    }
    if (this.user.address.locallity == "كرري") {
        this.delivery = 95;
    }
    if (this.user.address.locallity == "الخرطوم") {
        this.delivery = 75;
    }

    }, (err: any) => {
      console.log(err);
    });
    this.cart.getbookLength();
    this.authService.getLoggedInUser().subscribe((response: any) => {
      console.log(response)
      this.user = response.user;
    }, (err: any) => {
      console.log(err);
    });
    const id = localStorage.getItem('_id');
    this.cart.getorderuser(id).subscribe((res: any) => {
      console.log(res)
      this.order = res.orders;
      console.log(this.order)


    }
    )
    this.cart.getorderexuser(id).subscribe((res: any) => {
      console.log(res)
      this.trading = res.orders;
      console.log(this.trading)


    }
    )
    /*
    if(this.order.status === "processing" && this.order.type== "purchase" ){
      this.value1 = 40 ;
      this.bufferValue1 = 100 ;
      }
      else if(this.order.going =="going" && this.order.type== "purchase" ){
        this.value1 = 80 ;
        this.bufferValue1 = 90 ;
        }
        else if(this.order.going =="finshed" && this.order.type== "purchase" ){
          this.value1 = 100 ;
          this.bufferValue1 = 100 ;
          }
    
      
          if(this.trading.status =="processing" && this.order.type== "trading" ){
            this.value2 = 40 ;
            this.bufferValue2 = 50 ;
            }
           else if(this.trading.going =="going" && this.order.type== "trading" ){
              this.value2 = 80 ;
              this.bufferValue2 = 90 ;
              }
             else if(this.trading.going =="finshed" && this.order.type== "trading" ){
                this.value2 = 100 ;
                this.bufferValue2 = 100 ;
                }
    
    */
  }

}
















import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  carts = [];
  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basketService.getCart().subscribe((response: any) => {
      console.log(response);
    });
  }

  onSubmit(form) {

   
 }
}

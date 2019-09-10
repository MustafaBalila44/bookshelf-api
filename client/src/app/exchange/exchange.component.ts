import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {
exchange :number;
  constructor(private cart : BasketService , private router : Router) { }

  ngOnInit() {
  }

  
  onSubmit() { 
    this.exchange = this.exchange;
    this.router.navigate(['/user/checkoutexchange'], { queryParams: { bookscuont: this.exchange } });
    
  } 
}

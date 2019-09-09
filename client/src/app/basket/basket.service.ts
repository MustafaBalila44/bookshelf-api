import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../app.globals';

@Injectable({
    providedIn: 'root'
})
export class BasketService {
    constructor(private http: HttpClient, private globals: GlobalService) { }
    a = false;
    b = false;
    c = false;
    getCart() {
        const id = localStorage.getItem('_id');
        return this.http.get(`${this.globals.apiUrl}users/${id}/cart/`);
    }

    removeFromCart(bookId: string) {
        return this.http.post(`${this.globals.apiUrl}users/remove_from_cart/`, { bookId });
    }

    purshasetypeone() {
        return this.a;

    }
    purshasetypetwo() {
        return this.b;


    }
    purshasetypethree() {
        return this.c;


    }

    order(order){
        return this.http.post(`${this.globals.apiUrl}users/order/` , {order})
    }




}

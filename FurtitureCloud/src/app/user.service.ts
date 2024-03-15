import { HttpClient } from '@angular/common/http';
import { Injectable, afterRender } from '@angular/core';
import { take } from 'rxjs';
import { AdminService } from './admin.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  enabled: boolean = false;
  url: string = 'http://localhost:8000/user/';
  orderUrl: string = 'http://localhost:8000/orders/';
  user: any;
  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  reinitializeUser() {
    return this.httpClient.get(this.url);
  }
  updateCart(cart: string) {
    this.user = this.loginService.user;
    this.user.cartData = cart;
    return this.httpClient.put(this.url + 'update', this.user);
  }
  updateWishlist(wishlist: string) {
    this.user = this.loginService.user;
    this.user.wishListData = wishlist;
    return this.httpClient.put(this.url + 'update', this.user);
  }

  placeOrder(total: string) {
    return this.httpClient.post(this.orderUrl + 'create', {
      cart: this.user.cartData + total,
    });
  }
  getOrders(user_id: number) {
    return this.httpClient.get(this.orderUrl + 'getAll/User/' + user_id);
  }
}

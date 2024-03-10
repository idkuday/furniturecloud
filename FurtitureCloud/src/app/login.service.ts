import { HttpClient } from '@angular/common/http';
import { Injectable, afterRender } from '@angular/core';
import { UserService } from './user.service';
import { AdminService } from './admin.service';
import { CartService } from './cart.service';
import { ProductService } from './product.service';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUrl = 'http://localhost:8000/auth/login';
  registerUrl = 'http://localhost:8000/auth/reg/';
  constructor(
    private HttpClientService: HttpClient,
    private adminService: AdminService,
    private productService: ProductService
  ) {
    if (!this.loggedIn) {
      afterRender(() => {
        const u = localStorage.getItem('FC_user');
        this.user = u ? JSON.parse(u) : undefined;
        this.loggedIn = JSON.parse(
          localStorage.getItem('FC_loggedin') || 'false'
        );
        this.saveState();

        this.productService
          .getAllProducts('none', 'none')
          .pipe(take(1))
          .subscribe((d) => {
            this.productService.products = d;
            this.adminService.checkAccess();
            // this.setCart();
          });
      });
    }
  }

  user: any;
  loggedIn: boolean = false;

  login(login: { email: string; password: string }) {
    localStorage.removeItem('access_token');
    return this.HttpClientService.post(this.loginUrl, login);
  }

  // setCart() {
  //   this.cartService.parseCart(this.user.cartData);
  //   console.log('SET CART: ' + this.user.cartData);
  // }
  logout() {
    localStorage.removeItem('FC_loggedin');
    localStorage.removeItem('FC_user');
    localStorage.removeItem('FC_Admin');
    localStorage.removeItem('access_token');
    this.loggedIn = false;
    this.user = undefined;
    window.location.reload();
  }

  register(user: any, password: string) {
    return this.HttpClientService.post(this.registerUrl + password, user);
  }

  saveState() {
    this.adminService.checkAccess();

    localStorage.setItem('FC_user', JSON.stringify(this.user));
    localStorage.setItem('FC_loggedin', JSON.stringify(this.loggedIn));
  }
}

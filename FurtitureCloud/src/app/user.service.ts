import { HttpClient } from '@angular/common/http';
import { Injectable, afterRender } from '@angular/core';
import { take } from 'rxjs';
import { AdminService } from './admin.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
//Login Service will be separate
export class UserService {
  enabled: boolean = false;
  url: string = 'http://localhost:8000/user/';
  user: any;
  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {
    // afterRender(() => {
    //   this.checkAccess();
    // });
  }
  // getUser(userId: string) {
  //   let user: any;
  //   return this.httpClient.get(this.url + 'get/' + userId);
  // }

  // getAllUsers() {
  //   return this.httpClient.get<any[]>(this.url + 'getAll');
  //   // .subscribe((d) => this.users.push(...d));
  // }
  // setCart() {
  //   this.user = this.loginService.user;
  //   this.user.car

  // }
  reinitializeUser() {
    return this.httpClient.get(this.url);
  }
  updateCart(cart: string) {
    this.user = this.loginService.user;
    this.user.cartData = cart;
    return this.httpClient.put(this.url + 'update', this.user);
  }
  // createUser(user: any) {
  //   return this.httpClient.put(this.url + 'create', user);
  // }
  // deleteUser(userId: number) {
  //   return this.httpClient
  //     .delete(this.url + 'delete/' + userId)
  //     .subscribe((d) => {
  //       console.log('Delete User :' + d);
  //     });
  // }
}

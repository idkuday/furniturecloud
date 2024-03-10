import { Component, afterRender } from '@angular/core';
import { LoginService } from '../login.service';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  placeholder: string = 'Search';
  cartLength: number = this.cart.size;

  isAdmin(): boolean {
    return this.admin.enabled;
  }
  isLoggedIn(): boolean {
    return this.loginService.loggedIn;
  }
  constructor(
    public loginService: LoginService,
    private cart: CartService,
    private admin: AdminService
  ) {
    afterRender(() => {
      this.cartLength = this.cart.size;
      this.isAdmin();
      this.isLoggedIn();
    });
  }
}

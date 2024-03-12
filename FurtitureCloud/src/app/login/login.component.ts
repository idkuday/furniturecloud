import { Component, EventEmitter, Output, afterRender } from '@angular/core';
import { LoginService } from '../login.service';
import { UserService } from '../user.service';
import { AdminService } from '../admin.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  goToOrders() {
    this.router.navigate(['/orders']).then(() => window.location.reload());
  }
  logout() {
    this.loginservice.logout();
    this.user = undefined;
    this.clicked = false;
    this.email = '';
    this.password = '';
  }

  email: string = '';
  password: string = '';
  user: any = undefined;
  clicked = false;
  onSubmitLogin(): void {
    this.loginservice
      .login({ email: this.email, password: this.password })
      .subscribe((d: any) => {
        if (d.user) {
          this.user = d.user;
          this.loginservice.user = d.user;
          this.loginservice.loggedIn = true;
          this.loginservice.saveState();
          localStorage.setItem('access_token', d.jwt);

          // this.loginservice.setCart();
          this.userService.user = this.user;
          this.adminService.checkAccess();
          this.cart.doRender();
          // window.location.reload();
        } else {
          this.clicked = true;
        }
      });
  }
  isLoggedIn(): boolean {
    this.user = this.loginservice.user;
    return this.loginservice.loggedIn;
  }
  constructor(
    private loginservice: LoginService,
    private userService: UserService,
    private adminService: AdminService,
    private cart: CartService,
    private router: Router
  ) {}
}

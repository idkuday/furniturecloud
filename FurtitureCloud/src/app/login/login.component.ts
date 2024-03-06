import { Component, EventEmitter, Output, afterRender } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
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
        } else {
          this.clicked = true;
        }
      });
  }
  isLoggedIn(): boolean {
    this.user = this.loginservice.user;
    return this.loginservice.loggedIn;
  }
  constructor(private loginservice: LoginService) {}
}

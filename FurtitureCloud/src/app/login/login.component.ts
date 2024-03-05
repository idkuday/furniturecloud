import { Component, EventEmitter, Output } from '@angular/core';
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
  }
  @Output() onSubmitLoginEvent = new EventEmitter();
  email: string = '';
  password: string = '';
  user: any = this.loginservice.user;
  onSubmitLogin(): void {
    this.loginservice
      .login({ email: this.email, password: this.password })
      .subscribe((d: any) => {
        console.log(d);
        if (d.user) {
          this.user = d.user;
          this.loginservice.user = d.user;
          this.loginservice.loggedIn = true;
          console.log(this.user);
          localStorage.setItem('access_token', d.jwt);
        }
      });
  }
  constructor(private loginservice: LoginService) {}
}

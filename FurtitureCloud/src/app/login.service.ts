import { HttpClient } from '@angular/common/http';
import {
  DoCheck,
  Injectable,
  OnChanges,
  SimpleChanges,
  afterRender,
} from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUrl = 'http://localhost:8000/auth/login';
  registerUrl = 'http://localhost:8000/auth/reg/';
  constructor(
    private HttpClientService: HttpClient,
    private userService: UserService
  ) {
    if (!this.loggedIn) {
      afterRender(() => {
        const u = localStorage.getItem('FC_user');
        this.user = u ? JSON.parse(u) : undefined;
        this.loggedIn = JSON.parse(
          localStorage.getItem('FC_loggedin') || 'false'
        );
        this.saveState();
      });
    }
  }

  user: any;
  loggedIn: boolean = false;

  login(login: { email: string; password: string }) {
    localStorage.removeItem('access_token');
    return this.HttpClientService.post(this.loginUrl, login);
  }

  logout() {
    localStorage.removeItem('FC_loggedin');
    localStorage.removeItem('FC_user');
    localStorage.removeItem('FC_Admin');
    localStorage.removeItem('access_token');
    this.loggedIn = false;
    this.user = undefined;
  }

  register(user: any, password: string) {
    return this.HttpClientService.post(this.registerUrl + password, user);
  }

  saveState() {
    this.userService.checkAccess();

    localStorage.setItem('FC_user', JSON.stringify(this.user));
    localStorage.setItem('FC_loggedin', JSON.stringify(this.loggedIn));
  }
}

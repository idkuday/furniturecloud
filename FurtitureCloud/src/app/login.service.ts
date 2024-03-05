import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'http://localhost:8000/auth/login';
  constructor(private HttpClientService: HttpClient) {}
  user: any = undefined;
  loggedIn: boolean = false;
  login(login: { email: string; password: string }) {
    localStorage.removeItem('access_token');
    return this.HttpClientService.post(this.url, login);
  }
  logout() {
    localStorage.removeItem('access_token');
    this.loggedIn = false;
    this.user = undefined;
  }
}

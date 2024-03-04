import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'http://localhost:8000/auth/login';
  constructor(private HttpClientService: HttpClient) {}
  user: any;
  login(login: { email: string; password: string }) {
    console.log('here');

    this.HttpClientService.post(this.url, login).subscribe((d: any) => {
      console.log(d);
      this.user = d.user;
      localStorage.setItem('access_token', d.jwt);
      this.HttpClientService.get('http://localhost:8000/admin').subscribe((e) =>
        console.log(e)
      );
    });
  }
}

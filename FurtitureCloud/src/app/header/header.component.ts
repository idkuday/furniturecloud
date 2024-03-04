import { Component } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  login() {
    console.log('Hi');

    this.loginService.login({ email: 'Admin', password: '1234' });
  }
  addToCart() {
    this.cartLength++;
  }
  placeholder: string = 'Search';
  cartLength: number = 0;
  constructor(private loginService: LoginService) {
    console.log('Here');
  }
}

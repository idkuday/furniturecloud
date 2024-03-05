import { Component } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  loggedin: boolean;
  addToCart() {
    this.cartLength++;
  }
  placeholder: string = 'Search';
  cartLength: number = 0;
  constructor(public loginService: LoginService) {
    this.loggedin = loginService.loggedIn;
  }
}

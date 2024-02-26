import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  addToCart() {
    this.cartLength++;
  }
  placeholder: string = 'Search';
  cartLength: number = 0;
}

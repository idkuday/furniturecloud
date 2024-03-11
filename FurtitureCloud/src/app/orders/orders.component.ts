import { Component, OnInit, afterRender } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  constructor(private cartService: CartService) {
    afterRender(() => {
      this.cartService.getOrders();
    });
  }
  ngOnInit(): void {
    this.cartService.lastOrder$.subscribe(() => {
      this.orders = this.cartService.orders;
    });
  }
}

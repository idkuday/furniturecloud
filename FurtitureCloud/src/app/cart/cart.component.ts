import { Component, OnInit, afterRender } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart: { product: any; quantity: number }[] = [];
  imgUrl: any;

  constructor(
    private cartService: CartService,
    private productService: ProductService // Inject ProductService
  ) {
    afterRender(() => {
      this.doRender$.next();
    });
  }

  ngOnInit(): void {
    this.doRender$.subscribe(() => this.doRender());
  }

  changeQuantity(item: { product: any; quantity: number }, op: number) {
    if (item.quantity < item.product.stock) {
      if (item.quantity === 1 && op === -1) {
        return;
      }
      item.quantity += op;

      this.cartService.changeCartQuantityEx(item.product, item.quantity);
      this.doRender$.next();
    }
  }

  removeFromCart(sku: number) {
    this.cartService.removeFromCart(sku);
    this.cart = this.cartService.cart;
    this.doRender$.next();
  }

  getTotalItems() {
    return this.cartService.getTotalItems();
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice().toFixed(2);
  }

  // giveRange(stock: number): number[] {
  //   let range = [];
  //   for (let i = 1; i < stock; i++) {
  //     range.push(i);
  //   }
  //   console.log('IN give rnge' + range);

  //   return range;
  // }
  private doRender$: Subject<void> = new Subject<void>();
  doRender() {
    this.cartService.doRender();
    this.cart = this.cartService.cart;
    console.log('IN cart comp');
    console.log(this.cart);
  }
  checkout() {}
}

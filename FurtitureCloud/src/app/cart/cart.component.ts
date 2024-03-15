import { Component, OnInit, afterRender } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { Subject, take } from 'rxjs';
import { MicroservicesService } from '../microservices.service';
import { LoginService } from '../login.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart: { product: any; quantity: number }[] = [];
  imgUrl: any;
  Orders: any[] = [];
  coupon: string = '';
  percent: any;

  constructor(
    private cartService: CartService,
    private productService: ProductService, // Inject ProductService
    private discount: MicroservicesService,
    private login: LoginService,
    private user: UserService
  ) {
    afterRender(() => {
      this.doRender$.next();
      this.cartService.getOrders();
    });
  }

  ngOnInit(): void {
    this.doRender$.subscribe(() => this.doRender());
    this.cartService.lastOrder$.subscribe((d) => {
      this.Orders = this.cartService.orders;
    });
  }

  changeQuantity(item: { product: any; quantity: number }, op: number) {
    if (item.quantity <= item.product.stock) {
      if (item.quantity === 1 && op === -1) {
        return;
      }
      if (item.quantity == item.product.stock && op === 1) return;
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
  getTotalDiscounted() {
    return (this.cartService.getTotalPrice() * (this.percent / 100)).toFixed(2);
  }
  getTotalDiscountedPrice() {
    return (
      this.cartService.getTotalPrice() *
      ((100 - this.percent) / 100)
    ).toFixed(2);
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
  }
  checkout() {
    let discount = this.discountApplied
      ? this.getTotalDiscountedPrice()
      : this.getTotalPrice();
    if (!this.login.loggedIn) {
      alert('Please Login to place Orders');
    }
    if (this.cart.length == 0) {
      alert('Cart is empty!');
    }
    this.cartService
      .placeOrder(':' + discount)
      .pipe(take(1))
      .subscribe((d) => {
        this.cartService.clearCart();
        console.log(d);

        this.user
          .updateCart('')
          .pipe(take(1))
          .subscribe((e) => {
            this.login.user = e;
            this.login.saveState();

            this.doRender$.next();
          });
      });
    this.discountApplied = false;
    alert('Order Placed, Payment Received : $' + discount);
    // window.location.reload();
  }
  discountApplied: boolean = false;
  applyDiscount() {
    this.discount
      .getDiscount(this.coupon, this.login.user.user_id)
      .pipe(take(1))
      .subscribe((d: any) => {
        if (d.valid) {
          this.discountApplied = true;
          this.percent = d.discount.percent;
        } else {
          this.discountApplied = false;
        }
      });
  }
}

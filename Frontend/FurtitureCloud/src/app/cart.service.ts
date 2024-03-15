import { Injectable, afterRender } from '@angular/core';
import { Subject, map, take } from 'rxjs';
import { ProductService } from './product.service';
import { UserService } from './user.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: { product: any; quantity: number }[] = [];
  size: number = this.cart.length;
  orders: any[] = [];
  wishlist: any[] = [];
  loadedCart$: Subject<void> = new Subject<void>();
  lastOrder$: Subject<any> = new Subject<any>();

  constructor(
    private productService: ProductService,
    private user: UserService,
    private login: LoginService
  ) {
    afterRender(() => this.doRender$.next());
  }

  getQuantity(sku: number): number {
    const index = this.cart.findIndex((item) => item.product.sku === sku);
    if (index === -1) return 0;
    else {
      return this.cart[index].quantity;
    }
  }

  changeCartQuantity(product: any, quantity: number) {
    const index = this.cart.findIndex(
      (item) => item.product.sku === product.sku
    );
    if (index !== -1) {
      this.cart[index].quantity = quantity;
    } else {
      this.cart.push({ product, quantity });
    }
  }
  changeCartQuantityEx(product: any, quantity: number) {
    const index = this.cart.findIndex(
      (item) => item.product.sku === product.sku
    );
    if (index !== -1) {
      this.cart[index].quantity = quantity;
    } else {
      this.cart.push({ product, quantity });
    }
    this.updateUser();
  }

  removeFromCart(sku: number) {
    this.cart = this.cart.filter((item) => item.product.sku !== sku);
    this.updateUser();
  }

  getTotalItems() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.cart.reduce(
      (total, item: any) => total + item.product.price * item.quantity,
      0
    );
  }

  clearCart() {
    this.cart = [];
  }

  toData(): string {
    return (
      this.cart
        .map((item) => `${item.product.sku} ${item.quantity}`)
        .join(',') + ''
    );
  }
  updateUser() {
    this.user
      .updateCart(this.toData())
      .pipe(take(1))
      .subscribe((d) => {
        this.lastOrder$.next(d);
        this.login.user = d;
        this.login.saveState();

        this.doRender$.next();
      });
  }
  placeOrder(total: string) {
    return this.user.placeOrder(total);
  }
  getOrders() {
    this.user.user = this.login.user;
    return this.user
      .getOrders(this.user.user.user_id)
      .pipe(take(1))
      .subscribe((d: any) => {
        this.parseOrder(d);
      });
  }

  parseCart(data: string): void {
    this.clearCart(); // Clear existing cart before parsing new data
    const dataArray: string[] = data.split(',');
    dataArray.forEach((item) => {
      const [skuStr, quantityStr] = item.split(' ');
      const sku = Number(skuStr);
      const quantity = Number(quantityStr);
      const product = this.productService.products.find((p) => p.sku === sku);
      if (product) {
        this.changeCartQuantity(product, quantity);
      }
    });
    this.size = this.cart.length;
  }
  private doRender$: Subject<void> = new Subject<void>();
  doRender() {
    this.user.user = this.login.user;
    this.parseWishlist(this.user.user.wishListData);
    this.parseCart(this.user.user.cartData);
  }
  parseOrder(orders: any[]): void {
    let cart: any[] = [];

    for (let order of orders) {
      const [tempCart, totalDisc] = order.cart.split(':');
      const dataArray: string[] = tempCart.split(',');

      cart = [];
      dataArray.forEach((item) => {
        const [skuStr, quantityStr] = item.split(' ');
        const sku = Number(skuStr);
        const quantity = Number(quantityStr);
        const product = this.productService.products.find((p) => p.sku === sku);
        if (product) {
          cart.push({ product, quantity });
        }
      });
      order.cart = cart;
      order.total = totalDisc;
    }
    this.lastOrder$.next(orders);
    this.orders = orders;
  }
  parseWishlist(data: string): void {
    this.wishlist = [];
    if (!data) {
      return;
    }
    const dataArray: string[] = data.split(',');
    dataArray.forEach((item) => {
      const sku = Number(item);
      const product = this.productService.products.find((p) => p.sku === sku);
      if (product) {
        this.wishlist.push(product);
      }
    });
  }
  addToWL(product: any) {
    if (this.existsInWL(product.sku)) {
      return;
    }
    this.wishlist.push(product);
    this.updateUserWishList();
  }
  existsInWL(sku: number): boolean {
    if (this.wishlist.length === 0) {
      return false;
    }
    return this.wishlist.findIndex((item) => item.sku === sku) !== -1;
  }
  removeFromWL(sku: number) {
    this.wishlist = this.wishlist.filter((item: any) => item.sku !== sku);
    this.updateUserWishList();
  }
  updateUserWishList() {
    this.user
      .updateWishlist(this.wishListToData())
      .pipe(take(1))
      .subscribe((d) => {
        this.login.user = d;
        this.login.saveState();

        this.doRender$.next();
      });
  }
  wishListToData() {
    return this.wishlist.map((item: any) => `${item.sku}`).join(',');
  }
}

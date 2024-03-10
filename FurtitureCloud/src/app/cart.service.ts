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
  constructor(
    private productService: ProductService,
    private user: UserService,
    private login: LoginService
  ) {
    afterRender(() => this.doRender$.next());
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
    return this.cart
      .map((item) => `${item.product.sku} ${item.quantity}`)
      .join(',');
  }
  updateUser() {
    this.user
      .updateCart(this.toData())
      .pipe(take(1))
      .subscribe((d) => {
        console.log('Update user::::');

        this.login.user = d;
        this.login.saveState();
        console.log(this.login.user);
        this.doRender$.next();
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
    console.log(this.cart);
    this.size = this.cart.length;
  }
  private doRender$: Subject<void> = new Subject<void>();
  doRender() {
    this.user.user = this.login.user;

    this.parseCart(this.user.user.cartData);
    console.log('DORENDER CS' + this.user.user.cartData);
    console.log(this.login.user);
  }
}
// export class CartService {
//   cart = new Map<number, number>();

//   changeCartQuantity(sku: number, quantity: number) {
//     this.cart.set(sku, quantity);
//   }
//   removeFromCart(sku: number) {
//     this.cart.delete(sku);
//   }
//   //ToData
//   toData(): string {
//     let data: string = '';
//     for (const id of this.cart.keys()) {
//       data += id + ' ' + this.cart.get(id) + ',';
//     }
//     return data;
//   }

//   //ParseCart
//   parseCart(data: string): void {
//     const dataArray: string[] = data.split(',');
//     for (const item of dataArray) {
//       const arr: string[] = item.split(' ');
//       this.cart.set(Number(arr[0]), Number(arr[1]));
//     }
//   }
//   // Method to get the size of the map
//   size(): number {
//     return this.cart.size;
//   }

//   constructor() {}
// }

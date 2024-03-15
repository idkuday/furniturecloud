import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, afterRender } from '@angular/core';
import { AdminService } from './admin.service';
import { ProductService } from './product.service';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MicroservicesService {
  orders: any[] = [];
  enabled = false;
  constructor(
    private httpClient: HttpClient,
    private admin: AdminService,
    private productService: ProductService
  ) {
    afterRender(() => {
      this.enabled = this.admin.enabled;
    });
  }
  urlReports = 'http://localhost:8000/reports/between-times';
  urlDiscounts = 'http://localhost:8000/Discounts/';
  getOrders(start: string, end: string) {
    let params = new HttpParams().set('startTime', start).set('endTime', end);
    return this.httpClient.get(this.urlReports, { params: params });
  }
  parseOrder(orders: any[]): void {
    let cart: any[] = [];
    let total: number = 0;
    for (let order of orders) {
      const dataArray: string[] = order.cart.split(',');
      total = 0;
      cart = [];
      dataArray.forEach((item) => {
        const [skuStr, quantityStr] = item.split(' ');
        const sku = Number(skuStr);
        const quantity = Number(quantityStr);
        const product = this.productService.products.find((p) => p.sku === sku);
        if (product) {
          cart.push({ product, quantity });
          total += product.price;
        }
      });
      order.cart = cart;
      order.total = total.toFixed(2);
    }
    this.orders = orders;
  }
  setEnabled() {
    this.enabled = this.admin.enabled;
  }

  setDiscount(discount: any, userId: number) {
    return this.httpClient.post(
      this.urlDiscounts + 'create/' + userId,
      discount
    );
  }
  getDiscount(code: any, userId: number) {
    return this.httpClient.get(
      this.urlDiscounts + 'apply/' + userId + '/' + code
    );
  }
  // deleteDiscount(userId: number) {
  //   return this.httpClient
  //     .delete(this.urlDiscounts + 'delete/' + userId)
  //     .pipe(take(1))
  //     .subscribe((d) => console.log(d));
  // }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })

export class ProductService {
  url: string = 'http://localhost:8080/product/';
  products: any[] = [];
  constructor(private httpClient: HttpClient) {}

  getProduct(SKU: number): any {
    let product;
    this.httpClient
      .get(this.url + 'get/' + SKU)
      .subscribe((d) => (product = d));
    return product;
  }

  getAllProducts(category = 'none') {
    //Category based query else all products are queried
    // represents products
    if (category === 'none')
      this.httpClient
        .get<any[]>(this.url + 'getAll/none/none')
        .subscribe((e) => {
          this.products.push(...e);
        });
    else
      this.httpClient
        .get<any[]>(this.url + 'getAll/Category/' + category)
        .subscribe((e) => {
          this.products.push(...e);
        });
  }
  createproduct(product: any) {
    let sku: any = 0;
    this.httpClient
      .post(this.url + 'create', product)
      .subscribe((d) => (sku = d));
    this.products.push(this.getProduct(sku));
  }
  updateproduct(product: any) {
    return this.httpClient.put(this.url + 'update/', product);
  }
  deleteproduct(email: string) {
    return this.httpClient.delete(this.url + 'delete/' + email);
  }
}

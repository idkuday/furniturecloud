import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: string = 'http://localhost:8000/auth/product/';
  products: any[] = [];
  constructor(private httpClient: HttpClient) {}

  // getProduct(SKU: number): any {
  //   let product;
  //   this.httpClient
  //     .get(this.url + 'get/' + SKU)
  //     .subscribe((d) => (product = d));
  //   return product;
  // }

  getAllProducts(category = 'none', sort: string) {
    //Category based query else all products are queried
    // represents products
    if (category === 'none') {
      return this.httpClient.get<any[]>(this.url + 'getAll/none/none/' + sort);
    } else {
      return this.httpClient.get<any[]>(
        this.url + 'getAll/Category/' + category + '/' + sort
      );
    }
  }
}

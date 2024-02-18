import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  url: string= 'http://localhost:8080/product/';

  constructor(private httpClient: HttpClient) { 
  }

  getProduct(SKU: number): any {
    return this.httpClient.get(this.url + 'get/' + SKU);
  }

  getAllProducts() {
    // represents products
    return ['A', 'B', 'C'];
  }
}

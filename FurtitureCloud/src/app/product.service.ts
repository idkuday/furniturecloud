import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  url: string= 'http://localhost:8080/product/';
  products: any[] =[];
  constructor(private httpClient: HttpClient) { 
  }

  getProduct(SKU: number): any {
    return this.httpClient.get(this.url + 'get/' + SKU);
  }

  getAllProducts(category="none") {//Category based query else all products are queried
    // represents products
    if(category==="none")
      this.httpClient.get<any[]>(this.url + 'getAll/none/none').subscribe(e => { this.products.push(...e) })
    else
      this.httpClient.get<any[]>(this.url + 'getAll/Category/'+category).subscribe(e => { this.products.push(...e) })
     
  }

}

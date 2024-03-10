import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  enabled: boolean = false;

  productUrl: string = 'http://localhost:8000/admin/product/';
  constructor(private httpClient: HttpClient) {
    // afterRender(() => {
    //   this.checkAccess();
    // });
  }
  checkAccess() {
    if (this.enabled) {
      return;
    }
    let e = localStorage.getItem('FC_Admin');

    if (!e) {
      this.httpClient
        .get('http://localhost:8000/admin')
        .pipe(take(1))
        .subscribe((d: any) => {
          this.enabled = d.jwt === 'Admin Access';
          localStorage.setItem('FC_Admin', JSON.stringify(this.enabled));
          console.log(d);
        });
      return;
    }
    this.enabled = JSON.parse(e);
  }
  url: string = 'http://localhost:8000/admin/user/';
  getUser(userId: string) {
    return this.httpClient.get(this.url + 'get/' + userId);
  }

  getAllUsers() {
    return this.httpClient.get<any[]>(this.url + 'getAll');
    // .subscribe((d) => this.users.push(...d));
  }

  updateUser(user: any, password: string) {
    return this.httpClient.put(this.url + 'update/' + password, user);
  }
  createUser(user: any, password: string) {
    return this.httpClient.post(this.url + 'create/' + password, user);
  }
  deleteUser(userId: number) {
    return this.httpClient.delete(this.url + 'delete/' + userId);
  }

  // products

  createproduct(product: any) {
    let sku: any = 0;
    return this.httpClient.post(this.productUrl + 'create', product);
    // this.products.push(this.getProduct(sku));
  }

  updateproduct(product: any) {
    return this.httpClient.put(this.productUrl + 'update', product);
  }
  deleteproduct(sku: number) {
    console.log(sku);
    return this.httpClient.delete(this.productUrl + 'delete/' + sku);
  }

  getProductsFromCartById(product: any, id: number) {
    return product.filter((item: { id: number }) => item.id === id);
  }
}

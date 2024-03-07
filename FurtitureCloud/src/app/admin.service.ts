import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  enabled: boolean = false;
  url: string = 'http://localhost:8000/admin/user/';
  productUrl: string = 'http://localhost:8000/admin/product/';
  users: any[] = [];
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
  getUser(userId: string) {
    let user: any;
    return this.httpClient.get(this.url + 'get/' + userId);
  }

  getAllUsers() {
    return this.httpClient.get<any[]>(this.url + 'getAll');
    // .subscribe((d) => this.users.push(...d));
  }

  updateUser(user: any) {
    return this.httpClient.put(this.url + 'update', user);
  }
  createUser(user: any) {
    return this.httpClient.put(this.url + 'create', user);
  }
  deleteUser(userId: number) {
    return this.httpClient
      .delete(this.url + 'delete/' + userId)
      .subscribe((d) => {
        console.log('Delete User :' + d);
      });
  }

  // products

  createproduct(product: any) {
    let sku: any = 0;
    this.httpClient
      .post(this.productUrl + 'create', product)
      .subscribe((d) => (sku = d));
    // this.products.push(this.getProduct(sku));
  }
  updateproduct(product: any) {
    return this.httpClient.put(this.productUrl + 'update/', product);
  }
  deleteproduct(sku: number) {
    return this.httpClient.delete(this.productUrl + 'delete/' + sku);
  }

  getProductsFromCartById(product: any, id: number) {
    return product.filter((item: { id: number }) => item.id === id);
  }
}

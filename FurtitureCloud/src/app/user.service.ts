import { HttpClient } from '@angular/common/http';
import { Injectable, afterRender } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
//Login Service will be separate
export class UserService {
  enabled: boolean = false;
  url: string = 'http://localhost:8000/admin/user/';
  users: any[] = [];
  constructor(private httpClient: HttpClient) {
    // afterRender(() => {
    //   this.checkAccess();
    // });
  }
  checkAccess() {
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
    this.httpClient.put(this.url + 'update/', user);
  }
  deleteUser(userId: number) {
    return this.httpClient
      .delete(this.url + 'delete/' + userId)
      .subscribe((d) => {
        console.log('Delete User :' + d);
      });
  }
}

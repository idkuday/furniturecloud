import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//Login Service will be separate
export class UserService {
  url: string = 'http://localhost:8080/user/';
  users: any[] = [];
  userId: any = "";
  userOb !: { email: string, firstName: string, lastName: string, cartData: string, wishList: string };
  constructor(private httpClient : HttpClient) { 

  }

  getUser(email: string) {
    let user : any;
    this.httpClient.get(this.url + "get/" + email).subscribe(d => user = d);
    return user;    
  }

  getAllUsers() {
    this.httpClient.get<any[]>(this.url + "getAll").subscribe(d => this.users.push(...d));
  }
  
  createUser(user: any) {
    return this.httpClient.post(this.url + "create", user).subscribe(d => this.userId = d);
  }
  updateUser(user: any) {
    return this.httpClient.put(this.url + "update/", user);
    
  }
  deleteUser(email:string) {
    return this.httpClient.delete(this.url + "delete/" +email);
  }
}

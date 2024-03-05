import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../product-table/product-table.component';
export interface User {
  user_id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  cartData: string;
  wishListData: string;
  // orders: any[];
}

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent {
  displayedColumns: string[] = [
    'user_id',
    'email',
    'firstName',
    'lastName',
    'address',
    'cartData',
    'wishListData',
  ];
  users: User[] = [
    {
      user_id: 1,
      email: 'rrrr@xxx.com',
      firstName: 'ABC',
      lastName: 'DEF',
      address: 'CA',
      cartData: '',
      wishListData: '',
    },
    {
      user_id: 2,
      email: 'rrsrr@xxx.com',
      firstName: 'AeBC',
      lastName: 'DEsdaF',
      address: 'CAd',
      cartData: '',
      wishListData: '',
    },
    {
      user_id: 3,
      email: 'rrffrr@xxx.com',
      firstName: 'vvABC',
      lastName: 'DEFvv',
      address: 'CAbb',
      cartData: '',
      wishListData: '',
    },
    {
      user_id: 5,
      email: 'rrggrr@xxx.com',
      firstName: 'ggABC',
      lastName: 'DEFgg',
      address: 'CggA',
      cartData: '',
      wishListData: '',
    },
    {
      user_id: 4,
      email: 'rrrhhr@xxx.com',
      firstName: 'AhhBC',
      lastName: 'DEFhh',
      address: 'CAhh',
      cartData: '',
      wishListData: '',
    },
    {
      user_id: 7,
      email: 'r9rr@xxx.com',
      firstName: 'A5BC',
      lastName: 'DEFq',
      address: 'CAq',
      cartData: '',
      wishListData: '',
    },
    {
      user_id: 10,
      email: 'rrrr@4xxx.com',
      firstName: 'AdBC',
      lastName: 'DdEF',
      address: 'CdA',
      cartData: '',
      wishListData: '',
    },
  ];

  defaultFormInputs = ['', '', '', '', '', '', ''];

  clearAll() {
    this.defaultFormInputs = ['', '', '', '', '', '', ''];
  }

  clicked(user: any) {
    let i = 0;
    for (let j in user) {
      this.defaultFormInputs[i] = user[j] + '';
      i++;
    }
  }

  removeSelected() {
    let index = this.users.findIndex(
      (e) => e.user_id === Number(this.defaultFormInputs[0])
    );

    if (index != -1) {
      this.users.splice(index, 1);
    }
  }
}

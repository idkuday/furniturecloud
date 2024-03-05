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

const ELEMENT_DATA: User[] = [
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
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
  selection = new SelectionModel<User>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.user_id + 1
    }`;
  }
}

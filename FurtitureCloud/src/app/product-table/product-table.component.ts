import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Product {
  name: string;
  sku: number;
  descr: string;
  stock: number;
  category: string;
  price: number;
}


const ELEMENT_DATA: Product[] = [
  {sku: 1, name: 'Sofa', descr: 'aaa', stock: 1, category: 'Room', price: 1},
  {sku: 2, name: 'Sofa2', descr: 'aaa',stock: 4, category: 'Room', price: 2},
  {sku: 3, name: 'Sofa3', descr: 'aaa',stock: 6, category: 'Room', price: 3},
  {sku: 4, name: 'Sofa4', descr: 'aaa',stock: 9, category: 'Room', price: 4},
  {sku: 5, name: 'Sofa5', descr: 'aaa',stock: 10, category: 'Room', price: 5},
  {sku: 6, name: 'Sofa6', descr: 'aaa',stock: 12, category: 'Room', price: 6},
  {sku: 7, name: 'Lamp1', descr: 'aaa',stock: 14, category: 'Lighting', price: 7},
  {sku: 8, name: 'Lamp2', descr: 'aaa',stock: 15, category: 'Lighting', price: 8},
  {sku: 9, name: 'Lamp3', descr: 'aaa',stock: 18, category: 'Lighting', price: 9},
  {sku: 10, name: 'Lamp4', descr: 'aaa',stock: 20, category: 'Lighting', price: 10},
];



@Component({ selector: 'app-product-table', templateUrl: './product-table.component.html', styleUrl: './product-table.component.css' })
export class ProductTableComponent {
  displayedColumns: string[] = ['select', 'sku', 'name', 'descr', 'stock', 'category', 'price'];
  dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);
  dataSource1 = new MatTableDataSource<Product>(ELEMENT_DATA);
  selection = new SelectionModel<Product>(true, []);

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
  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.sku + 1}`;
  }
}

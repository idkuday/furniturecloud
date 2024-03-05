import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { log } from 'console';

export interface Product {
  name: string;
  sku: number;
  descr: string;
  stock: number;
  category: string;
  price: number;
}


@Component({ selector: 'app-product-table', templateUrl: './product-table.component.html', styleUrl: './product-table.component.css' })
export class ProductTableComponent {
  showFiller = false;
  displayedColumns: string[] = ['sku', 'name', 'descr', 'stock', 'category', 'price'];

  items: Product[] = [
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

  defaultFormInputs = ['', '', '', '', '', ''];


  clearAll() {
    this.defaultFormInputs = ['', '', '', '', '', ''];
  }

  clicked(item: any) {
     
    let i = 0;
    for (let j in item) {
      this.defaultFormInputs[i] = item[j] + '';
      i++;
    }

    
    
  }

  removeSelected() {
    let index = this.items.findIndex(e => e.sku === Number(this.defaultFormInputs[0]));
    
    if (index != -1) {
      this.items.splice(index, 1);
    }
  
  }
}

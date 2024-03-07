import { SelectionModel } from '@angular/cdk/collections';
import { Component, afterRender } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { log } from 'console';
import { ProductService } from '../product.service';
import { AdminService } from '../admin.service';
import { take } from 'rxjs';

export interface Product {
  sku: number;
  name: string;
  descr: string;
  stock: number;
  category: string;
  price: number;
}

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css',
})
export class ProductTableComponent {
  shouldChange: boolean = true;
  constructor(
    private productService: ProductService,
    private adminService: AdminService
  ) {
    afterRender(() => {
      if (this.shouldChange) {
        console.log("attemping to change - hi");
      this.productService
        .getAllProducts('none', 'none')
        // .pipe(take(1))
        .subscribe({
          next: (p) => {
            this.items = p;
            productService.products = p;
          },
          complete: () => {
            console.log("completed");
          }
        });
        this.shouldChange = false;
      }
    });
  }

  showFiller = false;
  displayedColumns: string[] = [
    'sku',
    'name',
    'descr',
    'stock',
    'category',
    'price',
  ];

  items: any[] = [];

  // items: Product[] = [
  //   {sku: 1, name: 'Sofa', descr: 'aaa', stock: 1, category: 'Room', price: 1},
  //   {sku: 2, name: 'Sofa2', descr: 'aaa',stock: 4, category: 'Room', price: 2},
  //   {sku: 3, name: 'Sofa3', descr: 'aaa',stock: 6, category: 'Room', price: 3},
  //   {sku: 4, name: 'Sofa4', descr: 'aaa',stock: 9, category: 'Room', price: 4},
  //   {sku: 5, name: 'Sofa5', descr: 'aaa',stock: 10, category: 'Room', price: 5},
  //   {sku: 6, name: 'Sofa6', descr: 'aaa',stock: 12, category: 'Room', price: 6},
  //   {sku: 7, name: 'Lamp1', descr: 'aaa',stock: 14, category: 'Lighting', price: 7},
  //   {sku: 8, name: 'Lamp2', descr: 'aaa',stock: 15, category: 'Lighting', price: 8},
  //   {sku: 9, name: 'Lamp3', descr: 'aaa',stock: 18, category: 'Lighting', price: 9},
  //   {sku: 10, name: 'Lamp4', descr: 'aaa',stock: 20, category: 'Lighting', price: 10},
  // ];

  defaultFormInputs = ['', '', '', '', '', ''];
  selected: any = null;

  clearAll() {
    this.defaultFormInputs = ['', '', '', '', '', ''];
  }

  clicked(item: any) {
    this.selected = item;

    this.defaultFormInputs[0] = this.selected.sku;
    this.defaultFormInputs[1] = this.selected.name;
    this.defaultFormInputs[2] = this.selected.descr;
    this.defaultFormInputs[3] = this.selected.stock;
    this.defaultFormInputs[4] = this.selected.category;
    this.defaultFormInputs[5] = this.selected.price;

    // let i = 0;
    // for (let j in item) {
    //   this.defaultFormInputs[i] = item[j] + '';
    //   i++;
    // }
  }

  removeSelected() {
    this.adminService.deleteproduct(this.selected.sku);
    // let index = this.items.findIndex(
    //   (e) => e.sku === Number(this.defaultFormInputs[0])
    // );

    // if (index != -1) {
    //   this.items.splice(index, 1);
    // }
    this.shouldChange = true;
  }

  updateSelected() {
    console.log(this.selected);
    this.adminService.createproduct(this.selected);
    this.productService.getAllProducts('none', 'none');
    this.items = this.productService.products;
    this.shouldChange = true;
  }

  addFromField() {
    const newProduct: any = {
      // sku: Number(this.defaultFormInputs[0]),
      name: this.defaultFormInputs[1],
      descr: this.defaultFormInputs[2],
      stock: Number(this.defaultFormInputs[3]),
      category: this.defaultFormInputs[4],
      price: Number(this.defaultFormInputs[5]),
    }
    console.log(newProduct);
    this.adminService.createproduct(newProduct);
    this.shouldChange = true;
  }

}

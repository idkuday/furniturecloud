import { Component, OnInit, afterRender } from '@angular/core';
import { ProductService } from '../product.service';
import { AdminService } from '../admin.service';
import { Subject, take } from 'rxjs';

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
export class ProductTableComponent implements OnInit {
  private doRender$: Subject<void> = new Subject<void>();
  prevelement: any;
  constructor(
    private productService: ProductService,
    private adminService: AdminService
  ) {}
  ngOnInit(): void {
    this.doRender$.subscribe(() => this.doRender());
    this.doRender$.next();
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
  doRender() {
    this.productService.getAllProducts('none', 'none').subscribe({
      next: (p) => {
        this.items = p;
        this.productService.products = p;
      },
      complete: () => {
        console.log('completed');
      },
    });
  }
  items: any[] = [];

  defaultFormInputs = ['', '', '', '', '', ''];
  selected: any = null;

  clearAll() {
    this.defaultFormInputs = ['', '', '', '', '', ''];
    if (this.prevelement) this.prevelement?.classList.remove('selected');
  }

  clicked(item: any) {
    this.selected = item;
    this.defaultFormInputs[0] = this.selected.sku;
    this.defaultFormInputs[1] = this.selected.name;
    this.defaultFormInputs[2] = this.selected.descr;
    this.defaultFormInputs[3] = this.selected.stock;
    this.defaultFormInputs[4] = this.selected.category;
    this.defaultFormInputs[5] = this.selected.price;

    this.prevelement?.classList.remove('selected');
    this.prevelement = document.getElementById(item.sku);
    this.prevelement.classList.add('selected');
  }

  removeSelected() {
    this.adminService.deleteproduct(this.selected.sku).subscribe(() => {
      this.doRender$.next();
      if (this.prevelement) this.prevelement?.classList.remove('selected');
    });
  }

  addFromField() {
    const product: any = {
      sku: this.defaultFormInputs[0],
      name: this.defaultFormInputs[1],
      descr: this.defaultFormInputs[2],
      stock: this.defaultFormInputs[3],
      category: this.defaultFormInputs[4],
      price: this.defaultFormInputs[5],
    };
    if (this.defaultFormInputs[0] == '') {
      console.log(product);
      this.adminService
        .createproduct(product)
        .pipe(take(1))
        .subscribe((d) => {
          this.doRender$.next();
        });
    } else {
      this.adminService
        .updateproduct(product)
        .subscribe(() => this.doRender$.next());
    }
  }
}

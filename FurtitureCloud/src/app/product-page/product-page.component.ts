import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  afterRender,
} from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent implements OnInit {
  @Input() category: string = '';
  @Input() query: string = '';

  products: any[] = [];
  // dependent on product service to get products by category
  // sortedItems = getAllItemsByCategory(this.category);

  nameOrder: boolean = false;
  priceOrder: boolean = false;
  filteredProducts: any[] = [];

  sortByName() {
    this.nameOrder = !this.nameOrder;
    this.products.sort((a: any, b: any) => {
      return this.nameOrder
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  }

  sortByPrice() {
    this.priceOrder = !this.priceOrder;
    this.products.sort((a: any, b: any) => {
      return this.priceOrder ? a.price - b.price : b.price - a.price;
    });
  }
  constructor(
    private productService: ProductService,
    private ref: ChangeDetectorRef,
    private cart: CartService
  ) {
    afterRender(() => this.applySearchFilter());
  }
  ngOnInit(): void {
    this.productService
      .getAllProducts(this.category, 'none')
      .pipe(take(1))
      .subscribe((p) => {
        this.products = p;
        this.filteredProducts = p;
      });
  }
  applySearchFilter() {
    if (this.query.trim() === '') {
      this.filteredProducts = this.products.slice();
    } else {
      this.filteredProducts = this.products.filter((product: any) => {
        const b1 = product.name
          .toLowerCase()
          .includes(this.query.toLowerCase());
        const b2 = product.descr
          .toLowerCase()
          .includes(this.query.toLowerCase());
        const b3 = product.category
          .toLowerCase()
          .includes(this.query.toLowerCase());
        return b1 || b2 || b3;
      });
    }
  }
}

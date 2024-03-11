import { Component, afterRender } from '@angular/core';
import { Subject } from 'rxjs';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  wishlist: any[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService // Inject ProductService
  ) {
    afterRender(() => {
      this.doRender$.next();
    });
  }

  ngOnInit(): void {
    this.doRender$.subscribe(() => this.doRender());
    this.cartService.loadedCart$.subscribe(() => {
      this.wishlist = this.cartService.wishlist;
    });
  }
  moveToCart(item: any) {
    this.cartService.changeCartQuantityEx(item, 1);
    this.removeFromWL(item.sku);
    this.doRender$.next();
  }
  removeFromWL(sku: number) {
    this.cartService.removeFromWL(sku);
    this.wishlist = this.cartService.wishlist;
    this.doRender$.next();
  }

  private doRender$: Subject<void> = new Subject<void>();
  doRender() {
    this.cartService.doRender();
    this.wishlist = this.cartService.wishlist;
    console.log(this.wishlist);
  }
}

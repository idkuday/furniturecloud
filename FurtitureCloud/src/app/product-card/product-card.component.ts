import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  afterRender,
} from '@angular/core';
import { CartService } from '../cart.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  @Input() item: any; // type product
  @Input() imgUrl: string = '';

  constructor(
    private cartService: CartService,
    private ref: ChangeDetectorRef
  ) {
    afterRender(() => {
      this.setQuantity();
    });
  }
  wl: boolean = false;

  quantity: number = 0;
  setQuantity() {
    this.quantity = this.cartService.getQuantity(this.item.sku);
    this.wl = this.cartService.existsInWL(this.item.sku);

    this.doRender$.next();
  }
  ngOnInit(): void {
    this.doRender$.subscribe(() => this.doRender());
    this.cartService.loadedCart$.subscribe(() => {
      this.setQuantity();
      this.doRender$.next();
    });
  }

  changeQuantity() {
    this.cartService.changeCartQuantityEx(
      this.item,
      this.cartService.getQuantity(this.item.sku) + 1
    );

    this.setQuantity();
  }
  addToWishList(item: any) {
    this.setQuantity();
    this.wl = true;

    this.cartService.addToWL(item);
  }
  removeFromWishList(item: any) {
    this.setQuantity();

    this.wl = false;
    this.cartService.removeFromWL(item.sku);
  }

  private doRender$: Subject<void> = new Subject<void>();
  doRender() {
    this.ref.detectChanges();
  }
}

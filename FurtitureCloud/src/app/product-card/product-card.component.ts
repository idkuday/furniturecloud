import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  @Input() item: any; // type product
  @Input() imgUrl: string =
    'https://material.angular.io/assets/img/examples/shiba2.jpg';
  @Input() isCart: boolean = false;

  @Output() quantityChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() removeFromCart: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  changeQuantity(event: any) {
    this.quantityChanged.emit(event.target.value);
  }

  removeProduct() {
    this.removeFromCart.emit();
  }
  ngOnInit(): void {}

  giveRange(stock: number) {
    let range = [];
    for (let i = 1; i < stock; i++) {
      range.push(i);
    }
    return range;
  }
}

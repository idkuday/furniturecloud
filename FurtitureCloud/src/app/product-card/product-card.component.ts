import { Component, Input, OnInit } from '@angular/core';
import { ProductTableComponent } from '../product-table/product-table.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})



export class ProductCardComponent implements OnInit {

  @Input() item: any; // type product
  @Input() imgUrl: string = 'https://material.angular.io/assets/img/examples/shiba2.jpg';
  @Input() isCart: boolean = false;

  constructor() {

  }

  ngOnInit(): void {
    
  }

  giveRange(stock: number) {
    let range = [];
    for (let i = 1; i < stock; i++) {
      range.push(i);
    }
    return range;
  }
  
}

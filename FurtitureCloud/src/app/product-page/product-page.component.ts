import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})

export class ProductPageComponent {

  // @Input() category: string;

  // dependent on product service to get products by category
  // sortedItems = getAllItemsByCategory(this.category);

  nameOrder: boolean = false;
  priceOrder: boolean = false;

  sortByName() {
    this.nameOrder = !this.nameOrder;
    if (this.nameOrder) {
      this.items.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.items.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  sortByPrice() {
    this.priceOrder = !this.priceOrder;
    if (this.priceOrder) {
      this.items.sort((a, b) => a.price - b.price);
    } else {
      this.items.sort((a, b) => b.price - a.price);
    }
  }

  items = [
    {
      id: 1,
      name: 'Silver Stainless Steel (Set of 2) Airtight Cookies Canister With Lid',
      price: 16344,
      category: 'Kitchen Stuff',
      stock: 12,
      description: 'Get your kitchen a very well-established look and ensure a better way of living. You can now give an unforgettable experience to your guests when you serve them Indian food in URBAN SPOON products. '
    },
    {
      id: 2,
      name: 'SofaSofaSofa',
      price: 20.0,
      category: 'room3',
      stock: 12,
      description: 'aaa4'
    },
    {
      id: 3,
      name: 'SofaSofaSofaSofa',
      price: 19.0,
      category: 'room5',
      stock: 18,
      description: 'aaa7'
    },
    {
      id: 4,
      name: 'Sofa',
      price: 100000.0,
      category: 'bedroom',
      stock: 376,
      description: 'qwer'
    }
  ];

}

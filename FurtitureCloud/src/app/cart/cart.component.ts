import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  items = [
    {
      id: 1,
      name: 'Sofa',
      price: 10.0,
      category: 'room',
      stock: 12,
      description: 'aaa'
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
    }
  ];

  giveRange(stock: number) {
    let range = [];
    for (let i = 1; i < stock; i++) {
      range.push(i);
    }
    return range;
  }

  foods: any[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewalue: '3'}
  ];

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
}

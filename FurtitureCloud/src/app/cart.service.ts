import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new Map<number, number>();

  changeCartQuantity(sku:number, quantity:number) {
      this.cart.set(sku, quantity);
  }
  removeFromCart(sku:number, quantity:number) {
    
    this.cart.delete(sku);
  }  
//ToData
toData(): string {
  let data: string = '';
  for (const id of this.cart.keys()) {
      data += id + ' ' + this.cart.get(id) + ',';
  }
  return data;
}

//ParseCart 
parseCart(data: string): void {
  const dataArray: string[] = data.split(",");
  for (const item of dataArray) {
      const arr: string[] = item.split(" ");
      this.cart.set(Number(arr[0]), Number(arr[1]));
  }
}  
// Method to get the size of the map
size(): number {
  return this.cart.size;
}
  constructor() { }
}





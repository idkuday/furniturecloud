import { Component } from '@angular/core';
// import { ProductService } from '../product.service';
// import { UserService } from '../user.service';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tiles: Tile[] = [
    { text: 'One', cols: 1, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    // { text: 'Four', cols: 1, rows: 1, color: '#DDBDF1' },
  ];
  // items: any[];
  // categories: any[] = [
  //   ['LivingRoom', '../../assets/LivingRoom.jpg'],
  //   ['Lighting', '../../assets/Lighting.jpg'],
  //   ['Bedroom', '../../assets/Bedroom.jpg'],
  // ];
  // routerPath(category: string) {
  //   // console.log("./" + category.toLowerCase);
  //   return './' + category.toLowerCase();
  // }
  // constructor() // private productService: ProductService,
  // // private userService: UserService
  // {
  //   // productService.getAllProducts()
  //   userService.getAllUsers();
  //   // this.items = productService.products;
  //   this.items = userService.users;
  //   console.log(this.items);
  //   setTimeout(() => {
  //     this.updateUser(this.items[0]);
  //   }, 5000);
  // }
  // updateUser(user: any) {
  //   user.firstName = 'Uday';
  //   this.userService.updateUser(user).subscribe((d) => console.log(d));
  //   user.firstName = 'abc';
  //   this.userService.getAllUsers();
  //   // this.items = productService.products;
  //   this.items = this.userService.users;
  // }
}

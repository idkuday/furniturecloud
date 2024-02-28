import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  items: any[];

  categories: any[] = [
    ['LivingRoom', '../../assets/LivingRoom.jpg'],
    ['Lighting', '../../assets/Lighting.jpg'],
    ['Bedroom', '../../assets/Bedroom.jpg'],
  ];
  routerPath(category: string) {
    // console.log("./" + category.toLowerCase);

    return './' + category.toLowerCase();
  }
  constructor(
    private productService: ProductService,
    private userService: UserService
  ) {
    // productService.getAllProducts()
    userService.getAllUsers();
    // this.items = productService.products;
    this.items = userService.users;
    console.log(this.items);
    setTimeout(() => {
      this.updateUser(this.items[0]);
    }, 5000);
  }

  updateUser(user: any) {
    user.firstName = 'Uday';
    this.userService.updateUser(user).subscribe((d) => console.log(d));
    user.firstName = 'abc';
    this.userService.getAllUsers();
    // this.items = productService.products;
    this.items = this.userService.users;
  }
}

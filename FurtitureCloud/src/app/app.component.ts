import { Component } from '@angular/core';
// import { ProductService } from './product.service';
// import { provideHttpClient, withFetch } from '@angular/common/http';
// import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  styleUrl: './app.component.css',
})
export class AppComponent {
  addToCart() {
    this.cartLength++;
  }
  placeholder: string = 'Search';
  cartLength: number = 0;
  // items: any[];

  // categories: any[] = [["LivingRoom", "../assets/LivingRoom.jpg"], ["Lighting", "../assets/Lighting.jpg"],
  // ["Bedroom", "../assets/Bedroom.jpg"]];
  // routerPath(category: string) {
  //   // console.log("./" + category.toLowerCase);

  //   return "./" + category.toLowerCase();
  // }
  // constructor(private productService: ProductService, private userService:UserService) {

  //   // productService.getAllProducts()
  //   userService.getAllUsers()
  //   // this.items = productService.products;
  //   this.items = userService.users;
  //   console.log(this.items);
  //   setTimeout(() => {
  //     this.updateUser(this.items[0])
  //   }, 5000);
  // }

  // updateUser(user:any) {
  //   user.firstName = "Uday"
  //   this.userService.updateUser(user).subscribe(d=>console.log(d))
  //   user.firstName="abc"
  //   this.userService.getAllUsers()
  //   // this.items = productService.products;
  //   this.items = this.userService.users;
  // }

  title = 'FurtitureCloud';
}

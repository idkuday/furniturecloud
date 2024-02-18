import { Component } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  items: any[];
  constructor(private productService: ProductService) {
    this.items = productService.getAllProducts();
  }

  title = 'FurtitureCloud';
}

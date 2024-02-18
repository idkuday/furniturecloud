import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  items: any[];
  constructor(private productService: ProductService) {
   
    productService.getAllProducts();
    this.items = productService.products;
    
  }

  title = 'FurtitureCloud';
}

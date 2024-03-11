import { ChangeDetectorRef, Component, afterRender } from '@angular/core';
import { take } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home-decor',
  templateUrl: './home-decor.component.html',
  styleUrl: './home-decor.component.css',
})
export class HomeDecorComponent {}

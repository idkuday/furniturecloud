import { ChangeDetectorRef, Component, afterRender } from '@angular/core';
import { take } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css',
})
export class KitchenComponent {}

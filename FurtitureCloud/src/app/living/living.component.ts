import { ChangeDetectorRef, Component, afterRender } from '@angular/core';
import { take } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-living',
  templateUrl: './living.component.html',
  styleUrl: './living.component.css',
})
export class LivingComponent {}

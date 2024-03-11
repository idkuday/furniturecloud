import { ChangeDetectorRef, Component, afterRender } from '@angular/core';
import { take } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-seating',
  templateUrl: './seating.component.html',
  styleUrl: './seating.component.css',
})
export class SeatingComponent {}

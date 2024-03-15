import { ChangeDetectorRef, Component, afterRender } from '@angular/core';
import { take } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-dining',
  templateUrl: './dining.component.html',
  styleUrl: './dining.component.css',
})
export class DiningComponent {}

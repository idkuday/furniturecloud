import { ChangeDetectorRef, Component, afterRender } from '@angular/core';
import { ProductService } from '../product.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-lighting',
  templateUrl: './lighting.component.html',
  styleUrl: './lighting.component.css',
})
export class LightingComponent {}

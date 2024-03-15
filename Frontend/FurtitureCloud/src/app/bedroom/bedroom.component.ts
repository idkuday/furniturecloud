import { ChangeDetectorRef, Component, afterRender } from '@angular/core';
import { take } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-bedroom',
  templateUrl: './bedroom.component.html',
  styleUrl: './bedroom.component.css',
})
export class BedroomComponent {}

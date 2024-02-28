import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



const Materials = [
  MatToolbarModule,
  MatGridListModule,
  MatButtonModule,
  MatIconButton,
  MatIconModule,
  MatBadgeModule,
  MatGridListModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  FormsModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
];

@NgModule({
  imports: [Materials],
  exports: [Materials],
})
export class MaterialModule {}

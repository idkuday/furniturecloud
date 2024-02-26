import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

const Materials = [
  MatToolbarModule,
  MatGridListModule,
  MatButtonModule,
  MatIconButton,
  MatIconModule,
  MatBadgeModule,
];

@NgModule({
  imports: [Materials],
  exports: [Materials],
})
export class MaterialModule {}

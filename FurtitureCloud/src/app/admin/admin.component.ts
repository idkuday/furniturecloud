import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  price: number;
}



const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Sofa', weight: 1, symbol: 'H', price: 1},
  {position: 2, name: 'Sofa2', weight: 4, symbol: 'He', price: 2},
  {position: 3, name: 'Sofa3', weight: 6, symbol: 'Li', price: 3},
  {position: 4, name: 'Sofa4', weight: 9, symbol: 'Be', price: 4},
  {position: 5, name: 'Sofa5', weight: 10, symbol: 'B', price: 5},
  {position: 6, name: 'Sofa6', weight: 12, symbol: 'C', price: 6},
  {position: 7, name: 'Lamp1', weight: 14, symbol: 'N', price: 7},
  {position: 8, name: 'Lamp2', weight: 15, symbol: 'O', price: 8},
  {position: 9, name: 'Lamp3', weight: 18, symbol: 'F', price: 9},
  {position: 10, name: 'Lamp4', weight: 20, symbol: 'Ne', price: 10},
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  displayedColumns: string[] = ['select', 'position', 'name', 'stock', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource1 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}


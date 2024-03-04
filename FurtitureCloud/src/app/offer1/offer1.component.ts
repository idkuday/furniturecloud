import { Component } from '@angular/core';
export interface Tile {
  // cols: number;
  title: string;
  url: string;
}
@Component({
  selector: 'app-offer1',
  templateUrl: './offer1.component.html',
  styleUrl: './offer1.component.css',
})
export class Offer1Component {
  tiles: Tile[] = [
    { url: '../../assets/Bedroom1.webp', title: 'Beds New Arrivals!' },
    { url: '../../assets/Bedroom2.webp', title: 'Beds2 New Arrivals!' },
    { url: '../../assets/dining1.webp', title: 'Dining New Arrivals!' },
    // { text: 'Four', cols: 1, rows: 1, color: '#DDBDF1' },
  ];
}

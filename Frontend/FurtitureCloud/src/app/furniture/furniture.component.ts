import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrl: './furniture.component.css',
})
export class FurnitureComponent implements OnInit {
  query: string = '';
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    // Access the search input value from the route parameter
    this.route.params.subscribe((params) => {
      this.query = params['query'];
      // Use the query to fetch search results or perform any other action
    });
  }
}

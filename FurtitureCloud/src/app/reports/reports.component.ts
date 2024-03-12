import { Component, afterRender } from '@angular/core';
import { MicroservicesService } from '../microservices.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent {
  orders: any[] = [];
  startTime: string = '';
  endTime: string = '';
  noOrders: boolean = false;
  enabled: boolean = this.reports.enabled;
  constructor(private reports: MicroservicesService) {
    afterRender(() => {
      this.reports.setEnabled();
      if (reports.orders) {
        this.orders = reports.orders;
        this.enabled = this.reports.enabled;
      }
    });
  }
  getOrders() {
    this.reports
      .getOrders(this.startTime, this.endTime)
      .pipe(take(1))
      .subscribe((d: any) => {
        console.log(d);

        if (d) {
          this.noOrders = true;
          this.reports.parseOrder(d);
          this.orders = this.reports.orders;
          console.log(this.orders);
        } else {
          this.noOrders = false;
        }
      });
  }
}

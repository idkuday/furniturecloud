import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../user.service';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  goToReports() {
    this.router.navigate(['/reports']).then(() => window.location.reload());
  }
  isEnabled(): boolean {
    return this.adminService.enabled;
  }
  constructor(private adminService: AdminService, private router: Router) {}
}

import { Component } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrl: './reg-form.component.css',
})
export class RegFormComponent {
  email: any;
  password: any;
  firstname: any;
  lastname: any;
  address: any;
  error: string = '';
  success: boolean = false;
  constructor(private authService: LoginService) {}
  isLoggedIn(): boolean {
    return this.authService.loggedIn;
  }
  onSubmitRegister() {
    this.authService
      .register(
        {
          email: this.email,
          firstName: this.firstname,
          lastName: this.lastname,
          address: this.address,
        },
        this.password
      )
      .subscribe(
        (d: any) => {
          if (d.jwt !== 'Success') {
            this.error = d.jwt;
            this.success = false;
          } else {
            this.success = true;
          }
        },
        (err: any) => {
          this.error = 'Invalid Input(s)';
          this.success = false;
        }
      );
  }
}

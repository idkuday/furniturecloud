import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
@Output() onSubmitLoginEvent = new EventEmitter();
register: any;
password: any;
firstname: any;
lastname: any;
address: any;
  onSubmitRegister() {
  throw new Error('Method not implemented.');
  }
}

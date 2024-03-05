import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrl: './reg-form.component.css'
})
export class RegFormComponent {
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

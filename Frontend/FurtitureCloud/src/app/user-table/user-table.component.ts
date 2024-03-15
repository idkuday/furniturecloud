import { Component, OnInit, afterRender } from '@angular/core';
import { AdminService } from '../admin.service';
import { Subject, take } from 'rxjs';
import { MicroservicesService } from '../microservices.service';

export interface User {
  user_id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  cartData: string;
  wishListData: string;
  // orders: any[];
}

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent implements OnInit {
  private doRender$: Subject<void> = new Subject<void>();
  displayedColumns: string[] = [
    'user_id',
    'email',
    'firstName',
    'lastName',
    'address',
    'cartData',
    'wishListData',
  ];
  users: any[] = [];
  shouldChange: boolean = true;
  selected: any = null;
  defaultFormInputs = ['', '', '', '', '', '', '', '', '', ''];

  clearAll() {
    this.defaultFormInputs = ['', '', '', '', '', '', '', '', '', ''];
    if (this.prevelement) this.prevelement?.classList.remove('selected');
  }

  clicked(item: any) {
    this.selected = item;

    this.defaultFormInputs[0] = this.selected.user_id;
    this.defaultFormInputs[1] = this.selected.email;
    this.defaultFormInputs[2] = this.selected.firstName;
    this.defaultFormInputs[3] = this.selected.lastName;
    this.defaultFormInputs[4] = this.selected.address;
    this.defaultFormInputs[5] = this.selected.cartData;
    this.defaultFormInputs[6] = this.selected.wishListData;

    this.prevelement?.classList.remove('selected');
    this.prevelement = document.getElementById(item.sku);
    this.prevelement.classList.add('selected');
  }
  prevelement: any;
  removeSelected() {
    this.adminService
      .deleteUser(this.selected.user_id)
      .subscribe(() => this.doRender$.next());
    if (this.prevelement) this.prevelement?.classList.remove('selected');
  }
  addUser() {
    let user: any = {
      user_id: this.defaultFormInputs[0],
      email: this.defaultFormInputs[1],
      firstName: this.defaultFormInputs[2],
      lastName: this.defaultFormInputs[3],
      address: this.defaultFormInputs[4],
      cartData: this.defaultFormInputs[5],
      wishListData: this.defaultFormInputs[6],
    };
    if (user.user_id == '') {
      this.adminService
        .createUser(
          user,
          this.defaultFormInputs[7] ? this.defaultFormInputs[7] : '1234'
        )
        .pipe(take(1))
        .subscribe((d) => {
          user = d;
          this.doRender$.next();
        });
    } else {
      console.log(this.selected);

      this.adminService
        .updateUser(
          user,
          this.defaultFormInputs[7] ? this.defaultFormInputs[7] : '-1'
        )
        .subscribe((d) => {
          this.doRender$.next();
          console.log(d);
        });
    }
  }
  success = 0;
  discount: any;
  setDiscount() {
    this.disc
      .setDiscount(
        {
          code: this.defaultFormInputs[8],
          percent: Number(this.defaultFormInputs[9]),
        },
        Number(this.defaultFormInputs[0])
      )
      .pipe(take(1))
      .subscribe((d: any) => {
        console.log(d);
        if (d) {
          this.discount = d;
          this.success = 1;
        } else {
          this.success = 2;
        }
      });
  }

  constructor(
    private adminService: AdminService,
    private disc: MicroservicesService
  ) {}

  ngOnInit(): void {
    this.doRender$.subscribe(() => this.doRender());
    this.doRender$.next();
  }

  doRender() {
    this.adminService
      .getAllUsers()
      .pipe(take(1))
      .subscribe({
        next: (p) => {
          this.users = p;
        },
        complete: () => {
          console.log('completed');
        },
      });
  }
}

import {
  ChangeDetectorRef,
  Component,
  OnInit,
  afterRender,
} from '@angular/core';
import { LoginService } from '../login.service';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  cartLength: number = this.cart.size;
  searchText: any = '';

  isAdmin(): boolean {
    return this.admin.enabled;
  }
  isLoggedIn(): boolean {
    return this.loginService.loggedIn;
  }
  constructor(
    public loginService: LoginService,
    private cart: CartService,
    private admin: AdminService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) {
    afterRender(() => {
      this.cartLength = this.cart.size;
      ref.detectChanges();
    });
  }
  search() {
    console.log('NAVIGATING1' + '   ' + this.searchText);

    this.router.navigate(['/furniture', this.searchText]);
  }
  ngOnInit(): void {
    this.cart.loadedCart$.subscribe(() => {
      this.cartLength = this.cart.size;
      this.isAdmin();
      this.isLoggedIn();
      this.ref.detectChanges();
    });
  }
}

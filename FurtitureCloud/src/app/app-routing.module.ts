import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { LightingComponent } from './lighting/lighting.component';
import { BedroomComponent } from './bedroom/bedroom.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { RegFormComponent } from './reg-form/reg-form.component';
import { LoginComponent } from './login/login.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { SeatingComponent } from './seating/seating.component';
import { DiningComponent } from './dining/dining.component';
import { HomeDecorComponent } from './home-decor/home-decor.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { LivingComponent } from './living/living.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  // {
  //   path: 'admin',
  //   children: [
  //     { path: '', component: AdminComponent },
  //     { path: 'products', component: ProductTableComponent },
  //    // { path: 'users', component: UserTableComponent },
  //   ],
  // },
  { path: 'lighting', component: LightingComponent },
  { path: 'bedroom', component: BedroomComponent },
  { path: 'seating', component: SeatingComponent },
  { path: 'dining', component: DiningComponent },
  { path: 'home-decor', component: HomeDecorComponent },
  { path: 'kitchen', component: KitchenComponent },
  { path: 'living', component: LivingComponent },
  { path: 'furniture', component: FurnitureComponent },
  { path: 'furniture/:query', component: FurnitureComponent },

  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegFormComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'orders', component: OrdersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

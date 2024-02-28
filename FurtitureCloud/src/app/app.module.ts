import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';

import { LampsComponent } from './lamps/lamps.component';
import { LightingComponent } from './lighting/lighting.component';
import { BedroomComponent } from './bedroom/bedroom.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from './material/material.module';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    LampsComponent,
    LightingComponent,
    BedroomComponent,
    CategoriesComponent,
    HomeComponent,
    CartComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MaterialModule],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})

export class AppModule {
  constructor() {
    provideHttpClient(withFetch());
    provideHttpClient(withFetch());
  }
}

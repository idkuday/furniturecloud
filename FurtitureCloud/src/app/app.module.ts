import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {
  HTTP_INTERCEPTORS,
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
import { Offer1Component } from './offer1/offer1.component';
import { OfferBanner1Component } from './offer-banner1/offer-banner1.component';
import { OfferBanner2Component } from './offer-banner2/offer-banner2.component';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { RegFormComponent } from './reg-form/reg-form.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LampsComponent,
    LightingComponent,
    BedroomComponent,
    HomeComponent,
    CartComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesComponent,
    AdminComponent,
    Offer1Component,
    OfferBanner1Component,
    OfferBanner2Component,
    RegFormComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MaterialModule, FormsModule],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}

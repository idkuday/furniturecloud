import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferBanner2Component } from './offer-banner2.component';

describe('OfferBanner2Component', () => {
  let component: OfferBanner2Component;
  let fixture: ComponentFixture<OfferBanner2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferBanner2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfferBanner2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferBanner1Component } from './offer-banner1.component';

describe('OfferBanner1Component', () => {
  let component: OfferBanner1Component;
  let fixture: ComponentFixture<OfferBanner1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferBanner1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfferBanner1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

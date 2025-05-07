import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusOfferAcceptanceComponent } from './campus-offer-acceptance.component';

describe('CampusOfferAcceptanceComponent', () => {
  let component: CampusOfferAcceptanceComponent;
  let fixture: ComponentFixture<CampusOfferAcceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusOfferAcceptanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusOfferAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

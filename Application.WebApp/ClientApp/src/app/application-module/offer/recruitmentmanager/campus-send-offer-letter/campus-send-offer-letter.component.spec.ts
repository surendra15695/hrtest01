import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusSendOfferLetterComponent } from './campus-send-offer-letter.component';

describe('CampusSendOfferLetterComponent', () => {
  let component: CampusSendOfferLetterComponent;
  let fixture: ComponentFixture<CampusSendOfferLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusSendOfferLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusSendOfferLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

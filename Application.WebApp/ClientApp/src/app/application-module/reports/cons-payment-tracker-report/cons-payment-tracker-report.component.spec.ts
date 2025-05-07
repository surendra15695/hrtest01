import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsPaymentTrackerReportComponent } from './cons-payment-tracker-report.component';

describe('ConsPaymentTrackerReportComponent', () => {
  let component: ConsPaymentTrackerReportComponent;
  let fixture: ComponentFixture<ConsPaymentTrackerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsPaymentTrackerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsPaymentTrackerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

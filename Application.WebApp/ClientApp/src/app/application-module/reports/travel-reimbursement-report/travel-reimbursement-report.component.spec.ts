import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelReimbursementReportComponent } from './travel-reimbursement-report.component';

describe('TravelReimbursementReportComponent', () => {
  let component: TravelReimbursementReportComponent;
  let fixture: ComponentFixture<TravelReimbursementReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelReimbursementReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelReimbursementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

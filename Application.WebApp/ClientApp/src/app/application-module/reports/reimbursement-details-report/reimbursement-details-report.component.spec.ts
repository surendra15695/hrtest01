import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementDetailsReportComponent } from './reimbursement-details-report.component';

describe('ReimbursementDetailsReportComponent', () => {
  let component: ReimbursementDetailsReportComponent;
  let fixture: ComponentFixture<ReimbursementDetailsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementDetailsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

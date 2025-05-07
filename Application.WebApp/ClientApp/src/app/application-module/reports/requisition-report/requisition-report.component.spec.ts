import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionReportComponent } from './requisition-report.component';

describe('RequisitionReportComponent', () => {
  let component: RequisitionReportComponent;
  let fixture: ComponentFixture<RequisitionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

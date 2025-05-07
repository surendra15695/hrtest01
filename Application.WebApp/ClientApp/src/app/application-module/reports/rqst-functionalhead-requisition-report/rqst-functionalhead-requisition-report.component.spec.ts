import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RqstFunctionalheadRequisitionReportComponent } from './rqst-functionalhead-requisition-report.component';

describe('RqstFunctionalheadRequisitionReportComponent', () => {
  let component: RqstFunctionalheadRequisitionReportComponent;
  let fixture: ComponentFixture<RqstFunctionalheadRequisitionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RqstFunctionalheadRequisitionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RqstFunctionalheadRequisitionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

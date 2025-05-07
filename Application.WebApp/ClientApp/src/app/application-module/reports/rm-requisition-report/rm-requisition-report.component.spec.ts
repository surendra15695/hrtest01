import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmRequisitionReportComponent } from './rm-requisition-report.component';

describe('RmRequisitionReportComponent', () => {
  let component: RmRequisitionReportComponent;
  let fixture: ComponentFixture<RmRequisitionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmRequisitionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmRequisitionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

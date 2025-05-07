import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentManagerRequisitionReportComponent } from './recruitment-manager-requisition-report.component';

describe('RecruitmentManagerRequisitionReportComponent', () => {
  let component: RecruitmentManagerRequisitionReportComponent;
  let fixture: ComponentFixture<RecruitmentManagerRequisitionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmentManagerRequisitionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentManagerRequisitionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

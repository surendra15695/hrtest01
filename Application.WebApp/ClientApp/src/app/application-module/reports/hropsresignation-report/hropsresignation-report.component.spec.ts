import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HropsresignationReportComponent } from './hropsresignation-report.component';

describe('HropsresignationReportComponent', () => {
  let component: HropsresignationReportComponent;
  let fixture: ComponentFixture<HropsresignationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HropsresignationReportComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HropsresignationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

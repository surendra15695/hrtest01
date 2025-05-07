import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentmentFunnelReportComponent } from './recruitmentment-funnel-report.component';

describe('RecruitmentmentFunnelReportComponent', () => {
  let component: RecruitmentmentFunnelReportComponent;
  let fixture: ComponentFixture<RecruitmentmentFunnelReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmentmentFunnelReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentmentFunnelReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

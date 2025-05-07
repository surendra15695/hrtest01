import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentCostSavingReportComponent } from './recruitment-cost-saving-report.component';

describe('RecruitmentCostSavingReportComponent', () => {
  let component: RecruitmentCostSavingReportComponent;
  let fixture: ComponentFixture<RecruitmentCostSavingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmentCostSavingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentCostSavingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

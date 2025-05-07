import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentCostReportComponent } from './recruitment-cost-report.component';

describe('RecruitmentCostReportComponent', () => {
  let component: RecruitmentCostReportComponent;
  let fixture: ComponentFixture<RecruitmentCostReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmentCostReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentCostReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

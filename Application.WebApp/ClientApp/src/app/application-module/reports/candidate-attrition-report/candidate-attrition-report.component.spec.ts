import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateAttritionReportComponent } from './candidate-attrition-report.component';

describe('CandidateAttritionReportComponent', () => {
  let component: CandidateAttritionReportComponent;
  let fixture: ComponentFixture<CandidateAttritionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateAttritionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateAttritionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

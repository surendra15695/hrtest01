import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InductionReportBatchwiseViewcandidateComponent } from './induction-report-batchwise-viewcandidate.component';

describe('InductionReportBatchwiseViewcandidateComponent', () => {
  let component: InductionReportBatchwiseViewcandidateComponent;
  let fixture: ComponentFixture<InductionReportBatchwiseViewcandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InductionReportBatchwiseViewcandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InductionReportBatchwiseViewcandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewfeedbackReportComponent } from './interviewfeedback-report.component';

describe('InterviewfeedbackReportComponent', () => {
  let component: InterviewfeedbackReportComponent;
  let fixture: ComponentFixture<InterviewfeedbackReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewfeedbackReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewfeedbackReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

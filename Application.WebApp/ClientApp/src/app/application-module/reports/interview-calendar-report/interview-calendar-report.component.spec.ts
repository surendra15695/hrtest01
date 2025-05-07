import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewCalendarReportComponent } from './interview-calendar-report.component';

describe('InterviewCalendarReportComponent', () => {
  let component: InterviewCalendarReportComponent;
  let fixture: ComponentFixture<InterviewCalendarReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewCalendarReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewCalendarReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

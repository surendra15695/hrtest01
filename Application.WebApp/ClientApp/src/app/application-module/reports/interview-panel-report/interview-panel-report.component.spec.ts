import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewPanelReportComponent } from './interview-panel-report.component';

describe('InterviewPanelReportComponent', () => {
  let component: InterviewPanelReportComponent;
  let fixture: ComponentFixture<InterviewPanelReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewPanelReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewPanelReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewassessmentpdfgenerationComponent } from './interviewassessmentpdfgeneration.component';

describe('InterviewassessmentpdfgenerationComponent', () => {
  let component: InterviewassessmentpdfgenerationComponent;
  let fixture: ComponentFixture<InterviewassessmentpdfgenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewassessmentpdfgenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewassessmentpdfgenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

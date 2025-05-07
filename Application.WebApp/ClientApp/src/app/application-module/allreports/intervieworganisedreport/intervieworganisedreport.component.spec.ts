import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervieworganisedreportComponent } from './intervieworganisedreport.component';

describe('IntervieworganisedreportComponent', () => {
  let component: IntervieworganisedreportComponent;
  let fixture: ComponentFixture<IntervieworganisedreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntervieworganisedreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervieworganisedreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

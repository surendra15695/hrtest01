import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateEvaluateassessmentlistComponentComponent } from './candidate-evaluateassessmentlist-component.component';

describe('CandidateEvaluateassessmentlistComponentComponent', () => {
  let component: CandidateEvaluateassessmentlistComponentComponent;
  let fixture: ComponentFixture<CandidateEvaluateassessmentlistComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateEvaluateassessmentlistComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateEvaluateassessmentlistComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

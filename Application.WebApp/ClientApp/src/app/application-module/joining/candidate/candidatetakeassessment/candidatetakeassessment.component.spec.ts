import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatetakeassessmentComponent } from './candidatetakeassessment.component';

describe('CandidatetakeassessmentComponent', () => {
  let component: CandidatetakeassessmentComponent;
  let fixture: ComponentFixture<CandidatetakeassessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatetakeassessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatetakeassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

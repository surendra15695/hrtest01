import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateassessmentlistComponent } from './candidateassessmentlist.component';

describe('CandidateassessmentlistComponent', () => {
  let component: CandidateassessmentlistComponent;
  let fixture: ComponentFixture<CandidateassessmentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateassessmentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateassessmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

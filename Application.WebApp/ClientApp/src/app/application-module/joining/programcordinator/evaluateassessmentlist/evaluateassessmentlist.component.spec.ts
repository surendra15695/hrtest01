import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateassessmentlistComponent } from './evaluateassessmentlist.component';

describe('EvaluateassessmentlistComponent', () => {
  let component: EvaluateassessmentlistComponent;
  let fixture: ComponentFixture<EvaluateassessmentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluateassessmentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateassessmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

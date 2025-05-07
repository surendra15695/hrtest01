import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InductionFeedbackComponent } from './induction-feedback.component';

describe('InductionFeedbackComponent', () => {
  let component: InductionFeedbackComponent;
  let fixture: ComponentFixture<InductionFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InductionFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InductionFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

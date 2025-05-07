import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InductionassessmentComponent } from './inductionassessment.component';

describe('InductionassessmentComponent', () => {
  let component: InductionassessmentComponent;
  let fixture: ComponentFixture<InductionassessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InductionassessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InductionassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

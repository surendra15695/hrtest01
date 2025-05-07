import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcevaluateassessmentComponent } from './pcevaluateassessment.component';

describe('PcevaluateassessmentComponent', () => {
  let component: PcevaluateassessmentComponent;
  let fixture: ComponentFixture<PcevaluateassessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcevaluateassessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcevaluateassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

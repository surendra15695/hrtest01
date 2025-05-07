import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcevaluateassessmentShowscoreComponent } from './pcevaluateassessment-showscore.component';

describe('PcevaluateassessmentShowscoreComponent', () => {
  let component: PcevaluateassessmentShowscoreComponent;
  let fixture: ComponentFixture<PcevaluateassessmentShowscoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcevaluateassessmentShowscoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcevaluateassessmentShowscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

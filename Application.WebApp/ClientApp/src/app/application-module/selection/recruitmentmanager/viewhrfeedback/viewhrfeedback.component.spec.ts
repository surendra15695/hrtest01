import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewhrfeedbackComponent } from './viewhrfeedback.component';

describe('ViewhrfeedbackComponent', () => {
  let component: ViewhrfeedbackComponent;
  let fixture: ComponentFixture<ViewhrfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewhrfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewhrfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

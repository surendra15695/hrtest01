import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormhrfeedbackComponent } from './formhrfeedback.component';

describe('FormhrfeedbackComponent', () => {
  let component: FormhrfeedbackComponent;
  let fixture: ComponentFixture<FormhrfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormhrfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormhrfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

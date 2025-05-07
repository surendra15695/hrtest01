import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveinductionfeedbackComponent } from './giveinductionfeedback.component';

describe('GiveinductionfeedbackComponent', () => {
  let component: GiveinductionfeedbackComponent;
  let fixture: ComponentFixture<GiveinductionfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiveinductionfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveinductionfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InductionfeedbackComponent } from './inductionfeedback.component';

describe('InductionfeedbackComponent', () => {
  let component: InductionfeedbackComponent;
  let fixture: ComponentFixture<InductionfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InductionfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InductionfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

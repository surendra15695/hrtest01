import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewinductionfeedbackComponent } from './viewinductionfeedback.component';

describe('ViewinductionfeedbackComponent', () => {
  let component: ViewinductionfeedbackComponent;
  let fixture: ComponentFixture<ViewinductionfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewinductionfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewinductionfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

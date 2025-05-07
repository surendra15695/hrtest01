import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcviewinductionfeedbackComponent } from './pcviewinductionfeedback.component';

describe('PcviewinductionfeedbackComponent', () => {
  let component: PcviewinductionfeedbackComponent;
  let fixture: ComponentFixture<PcviewinductionfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcviewinductionfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcviewinductionfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

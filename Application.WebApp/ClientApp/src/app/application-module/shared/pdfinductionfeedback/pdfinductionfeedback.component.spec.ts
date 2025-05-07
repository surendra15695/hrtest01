import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfinductionfeedbackComponent } from './pdfinductionfeedback.component';

describe('PdfinductionfeedbackComponent', () => {
  let component: PdfinductionfeedbackComponent;
  let fixture: ComponentFixture<PdfinductionfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfinductionfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfinductionfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

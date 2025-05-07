import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdinductionfeedbackComponent } from './cdinductionfeedback.component';

describe('CdinductionfeedbackComponent', () => {
  let component: CdinductionfeedbackComponent;
  let fixture: ComponentFixture<CdinductionfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdinductionfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdinductionfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

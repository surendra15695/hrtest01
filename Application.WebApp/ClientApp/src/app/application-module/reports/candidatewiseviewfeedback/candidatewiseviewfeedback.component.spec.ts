import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatewiseviewfeedbackComponent } from './candidatewiseviewfeedback.component';

describe('CandidatewiseviewfeedbackComponent', () => {
  let component: CandidatewiseviewfeedbackComponent;
  let fixture: ComponentFixture<CandidatewiseviewfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatewiseviewfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatewiseviewfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

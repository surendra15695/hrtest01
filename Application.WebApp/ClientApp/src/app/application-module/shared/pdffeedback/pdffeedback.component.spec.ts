import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdffeedbackComponent } from './pdffeedback.component';

describe('PdffeedbackComponent', () => {
  let component: PdffeedbackComponent;
  let fixture: ComponentFixture<PdffeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdffeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdffeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

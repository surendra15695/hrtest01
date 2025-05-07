import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcampusinterviewfeedbackComponent } from './addcampusinterviewfeedback.component';

describe('AddcampusinterviewfeedbackComponent', () => {
  let component: AddcampusinterviewfeedbackComponent;
  let fixture: ComponentFixture<AddcampusinterviewfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcampusinterviewfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcampusinterviewfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

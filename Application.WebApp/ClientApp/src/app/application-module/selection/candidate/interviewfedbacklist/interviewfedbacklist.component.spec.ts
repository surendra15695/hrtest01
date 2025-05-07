import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewfedbacklistComponent } from './interviewfedbacklist.component';

describe('InterviewfedbacklistComponent', () => {
  let component: InterviewfedbacklistComponent;
  let fixture: ComponentFixture<InterviewfedbacklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewfedbacklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewfedbacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

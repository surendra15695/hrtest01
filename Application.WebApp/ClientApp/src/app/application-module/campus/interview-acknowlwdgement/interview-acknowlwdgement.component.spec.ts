import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewAcknowlwdgementComponent } from './interview-acknowlwdgement.component';

describe('InterviewAcknowlwdgementComponent', () => {
  let component: InterviewAcknowlwdgementComponent;
  let fixture: ComponentFixture<InterviewAcknowlwdgementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewAcknowlwdgementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewAcknowlwdgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

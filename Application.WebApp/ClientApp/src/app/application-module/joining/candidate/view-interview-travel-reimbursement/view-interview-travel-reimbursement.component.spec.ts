import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInterviewTravelReimbursementComponent } from './view-interview-travel-reimbursement.component';

describe('ViewInterviewTravelReimbursementComponent', () => {
  let component: ViewInterviewTravelReimbursementComponent;
  let fixture: ComponentFixture<ViewInterviewTravelReimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInterviewTravelReimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInterviewTravelReimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

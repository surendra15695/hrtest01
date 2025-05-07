import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffCampusInterviewtravelreimbursementComponentComponent } from './off-campus-interviewtravelreimbursement-component.component';

describe('OffCampusInterviewtravelreimbursementComponentComponent', () => {
  let component: OffCampusInterviewtravelreimbursementComponentComponent;
  let fixture: ComponentFixture<OffCampusInterviewtravelreimbursementComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffCampusInterviewtravelreimbursementComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffCampusInterviewtravelreimbursementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

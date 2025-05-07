import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffCampusInterviewReimbursementListComponentComponent } from './off-campus-interview-reimbursement-list-component.component';

describe('OffCampusInterviewReimbursementListComponentComponent', () => {
  let component: OffCampusInterviewReimbursementListComponentComponent;
  let fixture: ComponentFixture<OffCampusInterviewReimbursementListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffCampusInterviewReimbursementListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffCampusInterviewReimbursementListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusInterviewReimbursementListComponent } from './campus-interview-reimbursement-list.component';

describe('CampusInterviewReimbursementListComponent', () => {
  let component: CampusInterviewReimbursementListComponent;
  let fixture: ComponentFixture<CampusInterviewReimbursementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusInterviewReimbursementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusInterviewReimbursementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

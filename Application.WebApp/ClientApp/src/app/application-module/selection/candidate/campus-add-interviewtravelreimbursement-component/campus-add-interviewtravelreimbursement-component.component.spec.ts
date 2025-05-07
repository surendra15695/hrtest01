import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusAddInterviewtravelreimbursementComponentComponent } from './campus-add-interviewtravelreimbursement-component.component';

describe('CampusAddInterviewtravelreimbursementComponentComponent', () => {
  let component: CampusAddInterviewtravelreimbursementComponentComponent;
  let fixture: ComponentFixture<CampusAddInterviewtravelreimbursementComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusAddInterviewtravelreimbursementComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusAddInterviewtravelreimbursementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

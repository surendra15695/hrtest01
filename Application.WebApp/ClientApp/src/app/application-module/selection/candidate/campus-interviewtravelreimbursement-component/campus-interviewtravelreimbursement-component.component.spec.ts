import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusInterviewtravelreimbursementComponentComponent } from './campus-interviewtravelreimbursement-component.component';

describe('CampusInterviewtravelreimbursementComponentComponent', () => {
  let component: CampusInterviewtravelreimbursementComponentComponent;
  let fixture: ComponentFixture<CampusInterviewtravelreimbursementComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusInterviewtravelreimbursementComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusInterviewtravelreimbursementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

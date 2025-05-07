import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusTestReimbursementListComponentComponent } from './campus-test-reimbursement-list-component.component';

describe('CampusTestReimbursementListComponentComponent', () => {
  let component: CampusTestReimbursementListComponentComponent;
  let fixture: ComponentFixture<CampusTestReimbursementListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusTestReimbursementListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusTestReimbursementListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

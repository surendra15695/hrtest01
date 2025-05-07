import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffCampusTestReimbursementListComponentComponent } from './off-campus-test-reimbursement-list-component.component';

describe('OffCampusTestReimbursementListComponentComponent', () => {
  let component: OffCampusTestReimbursementListComponentComponent;
  let fixture: ComponentFixture<OffCampusTestReimbursementListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffCampusTestReimbursementListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffCampusTestReimbursementListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

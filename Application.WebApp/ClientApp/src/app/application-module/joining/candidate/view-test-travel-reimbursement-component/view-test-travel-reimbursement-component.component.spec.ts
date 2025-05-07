import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestTravelReimbursementComponentComponent } from './view-test-travel-reimbursement-component.component';

describe('ViewTestTravelReimbursementComponentComponent', () => {
  let component: ViewTestTravelReimbursementComponentComponent;
  let fixture: ComponentFixture<ViewTestTravelReimbursementComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTestTravelReimbursementComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTestTravelReimbursementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

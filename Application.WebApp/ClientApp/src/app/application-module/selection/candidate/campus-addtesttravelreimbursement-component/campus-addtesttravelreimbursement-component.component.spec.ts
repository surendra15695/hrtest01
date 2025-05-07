import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusAddtesttravelreimbursementComponentComponent } from './campus-addtesttravelreimbursement-component.component';

describe('CampusAddtesttravelreimbursementComponentComponent', () => {
  let component: CampusAddtesttravelreimbursementComponentComponent;
  let fixture: ComponentFixture<CampusAddtesttravelreimbursementComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusAddtesttravelreimbursementComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusAddtesttravelreimbursementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

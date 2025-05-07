import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtesttravelreimbursementComponent } from './addtesttravelreimbursement.component';

describe('AddtesttravelreimbursementComponent', () => {
  let component: AddtesttravelreimbursementComponent;
  let fixture: ComponentFixture<AddtesttravelreimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtesttravelreimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtesttravelreimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

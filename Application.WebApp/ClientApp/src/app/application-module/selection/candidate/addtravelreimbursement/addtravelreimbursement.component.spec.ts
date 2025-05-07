import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtravelreimbursementComponent } from './addtravelreimbursement.component';

describe('AddtravelreimbursementComponent', () => {
  let component: AddtravelreimbursementComponent;
  let fixture: ComponentFixture<AddtravelreimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtravelreimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtravelreimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

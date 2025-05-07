import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdftesttravelreimbursementComponent } from './pdftesttravelreimbursement.component';

describe('PdftesttravelreimbursementComponent', () => {
  let component: PdftesttravelreimbursementComponent;
  let fixture: ComponentFixture<PdftesttravelreimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdftesttravelreimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdftesttravelreimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

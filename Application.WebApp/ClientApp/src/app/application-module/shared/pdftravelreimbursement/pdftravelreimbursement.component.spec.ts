import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdftravelreimbursementComponent } from './pdftravelreimbursement.component';

describe('PdftravelreimbursementComponent', () => {
  let component: PdftravelreimbursementComponent;
  let fixture: ComponentFixture<PdftravelreimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdftravelreimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdftravelreimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

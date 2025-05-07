import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtesttravelreimbursementComponent } from './viewtesttravelreimbursement.component';

describe('ViewtesttravelreimbursementComponent', () => {
  let component: ViewtesttravelreimbursementComponent;
  let fixture: ComponentFixture<ViewtesttravelreimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtesttravelreimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtesttravelreimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtravelreimbursementComponent } from './viewtravelreimbursement.component';

describe('ViewtravelreimbursementComponent', () => {
  let component: ViewtravelreimbursementComponent;
  let fixture: ComponentFixture<ViewtravelreimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtravelreimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtravelreimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

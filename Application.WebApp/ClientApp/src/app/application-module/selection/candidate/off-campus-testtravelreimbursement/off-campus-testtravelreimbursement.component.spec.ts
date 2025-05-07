import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffCampusTesttravelreimbursementComponent } from './off-campus-testtravelreimbursement.component';

describe('OffCampusTesttravelreimbursementComponent', () => {
  let component: OffCampusTesttravelreimbursementComponent;
  let fixture: ComponentFixture<OffCampusTesttravelreimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffCampusTesttravelreimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffCampusTesttravelreimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

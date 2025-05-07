import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusTesttravelreimbursementComponent } from './campus-testtravelreimbursement.component';

describe('CampusTesttravelreimbursementComponent', () => {
  let component: CampusTesttravelreimbursementComponent;
  let fixture: ComponentFixture<CampusTesttravelreimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusTesttravelreimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusTesttravelreimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

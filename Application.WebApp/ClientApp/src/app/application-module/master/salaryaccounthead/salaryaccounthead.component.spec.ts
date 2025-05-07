import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryaccountheadComponent } from './salaryaccounthead.component';

describe('SalaryaccountheadComponent', () => {
  let component: SalaryaccountheadComponent;
  let fixture: ComponentFixture<SalaryaccountheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryaccountheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryaccountheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

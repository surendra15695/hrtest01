import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalaryReportComponent } from './employee-salary-report.component';

describe('EmployeeSalaryReportComponent', () => {
  let component: EmployeeSalaryReportComponent;
  let fixture: ComponentFixture<EmployeeSalaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSalaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSalaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesalaryreportComponent } from './employeesalaryreport.component';

describe('EmployeesalaryreportComponent', () => {
  let component: EmployeesalaryreportComponent;
  let fixture: ComponentFixture<EmployeesalaryreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesalaryreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesalaryreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

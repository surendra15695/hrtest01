import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarystatisticsReportComponent } from './salarystatistics-report.component';

describe('SalarystatisticsReportComponent', () => {
  let component: SalarystatisticsReportComponent;
  let fixture: ComponentFixture<SalarystatisticsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarystatisticsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarystatisticsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

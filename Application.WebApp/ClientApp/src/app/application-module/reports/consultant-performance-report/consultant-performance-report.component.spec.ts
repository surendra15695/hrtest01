import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantPerformanceReportComponent } from './consultant-performance-report.component';

describe('ConsultantPerformanceReportComponent', () => {
  let component: ConsultantPerformanceReportComponent;
  let fixture: ComponentFixture<ConsultantPerformanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantPerformanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantPerformanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

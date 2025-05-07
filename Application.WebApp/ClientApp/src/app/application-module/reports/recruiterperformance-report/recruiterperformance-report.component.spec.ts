import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterperformanceReportComponent } from './recruiterperformance-report.component';

describe('RecruiterperformanceReportComponent', () => {
  let component: RecruiterperformanceReportComponent;
  let fixture: ComponentFixture<RecruiterperformanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterperformanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterperformanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

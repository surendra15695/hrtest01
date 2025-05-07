import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyReportComponent } from './vacancy-report.component';

describe('VacancyReportComponent', () => {
  let component: VacancyReportComponent;
  let fixture: ComponentFixture<VacancyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

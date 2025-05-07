import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanydoctorReportComponent } from './companydoctor-report.component';

describe('CompanydoctorReportComponent', () => {
  let component: CompanydoctorReportComponent;
  let fixture: ComponentFixture<CompanydoctorReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanydoctorReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanydoctorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

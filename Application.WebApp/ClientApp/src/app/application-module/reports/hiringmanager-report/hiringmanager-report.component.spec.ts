import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringmanagerReportComponent } from './hiringmanager-report.component';

describe('HiringmanagerReportComponent', () => {
  let component: HiringmanagerReportComponent;
  let fixture: ComponentFixture<HiringmanagerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringmanagerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringmanagerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

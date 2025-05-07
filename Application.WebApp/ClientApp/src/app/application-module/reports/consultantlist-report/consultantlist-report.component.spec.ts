import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantlistReportComponent } from './consultantlist-report.component';

describe('ConsultantlistReportComponent', () => {
  let component: ConsultantlistReportComponent;
  let fixture: ComponentFixture<ConsultantlistReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantlistReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantlistReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

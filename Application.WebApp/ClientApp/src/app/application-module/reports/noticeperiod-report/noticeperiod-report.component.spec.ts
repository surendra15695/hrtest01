import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeperiodReportComponent } from './noticeperiod-report.component';

describe('NoticeperiodReportComponent', () => {
  let component: NoticeperiodReportComponent;
  let fixture: ComponentFixture<NoticeperiodReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeperiodReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeperiodReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

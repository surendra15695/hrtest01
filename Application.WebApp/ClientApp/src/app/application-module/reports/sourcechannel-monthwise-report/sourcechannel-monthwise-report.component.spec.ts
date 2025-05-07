import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcechannelMonthwiseReportComponent } from './sourcechannel-monthwise-report.component';

describe('SourcechannelMonthwiseReportComponent', () => {
  let component: SourcechannelMonthwiseReportComponent;
  let fixture: ComponentFixture<SourcechannelMonthwiseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourcechannelMonthwiseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcechannelMonthwiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

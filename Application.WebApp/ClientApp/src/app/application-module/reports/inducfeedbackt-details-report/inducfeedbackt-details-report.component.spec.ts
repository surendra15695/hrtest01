import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InducfeedbacktDetailsReportComponent } from './inducfeedbackt-details-report.component';

describe('InducfeedbacktDetailsReportComponent', () => {
  let component: InducfeedbacktDetailsReportComponent;
  let fixture: ComponentFixture<InducfeedbacktDetailsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InducfeedbacktDetailsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InducfeedbacktDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RqstFunctionalheadOfferCandidateReportComponent } from './rqst-functionalhead-offer-candidate-report.component';

describe('RqstFunctionalheadOfferCandidateReportComponent', () => {
  let component: RqstFunctionalheadOfferCandidateReportComponent;
  let fixture: ComponentFixture<RqstFunctionalheadOfferCandidateReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RqstFunctionalheadOfferCandidateReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RqstFunctionalheadOfferCandidateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

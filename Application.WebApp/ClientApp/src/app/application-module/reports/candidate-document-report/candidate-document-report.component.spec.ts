import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDocumentReportComponent } from './candidate-document-report.component';

describe('CandidateDocumentReportComponent', () => {
  let component: CandidateDocumentReportComponent;
  let fixture: ComponentFixture<CandidateDocumentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateDocumentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateDocumentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

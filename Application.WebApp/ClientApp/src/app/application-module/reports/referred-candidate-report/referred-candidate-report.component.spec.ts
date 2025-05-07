import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferredCandidateReportComponent } from './referred-candidate-report.component';

describe('ReferredCandidateReportComponent', () => {
  let component: ReferredCandidateReportComponent;
  let fixture: ComponentFixture<ReferredCandidateReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferredCandidateReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferredCandidateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

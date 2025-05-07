import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatetrackerReportComponent } from './candidatetracker-report.component';

describe('CandidatetrackerReportComponent', () => {
  let component: CandidatetrackerReportComponent;
  let fixture: ComponentFixture<CandidatetrackerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatetrackerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatetrackerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

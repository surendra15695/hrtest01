import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexiReportCandidateWiseComponent } from './flexi-report-candidate-wise.component';

describe('FlexiReportCandidateWiseComponent', () => {
  let component: FlexiReportCandidateWiseComponent;
  let fixture: ComponentFixture<FlexiReportCandidateWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexiReportCandidateWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexiReportCandidateWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

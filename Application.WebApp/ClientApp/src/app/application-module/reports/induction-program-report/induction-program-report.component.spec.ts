import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InductionProgramReportComponent } from './induction-program-report.component';

describe('InductionProgramReportComponent', () => {
  let component: InductionProgramReportComponent;
  let fixture: ComponentFixture<InductionProgramReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InductionProgramReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InductionProgramReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewjoinersrecruitmentactivityReportComponent } from './newjoinersrecruitmentactivity-report.component';

describe('NewjoinersrecruitmentactivityReportComponent', () => {
  let component: NewjoinersrecruitmentactivityReportComponent;
  let fixture: ComponentFixture<NewjoinersrecruitmentactivityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewjoinersrecruitmentactivityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewjoinersrecruitmentactivityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

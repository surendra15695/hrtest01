import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewjoinersrecruitmentmodeReportComponent } from './newjoinersrecruitmentmode-report.component';

describe('NewjoinersrecruitmentmodeReportComponent', () => {
  let component: NewjoinersrecruitmentmodeReportComponent;
  let fixture: ComponentFixture<NewjoinersrecruitmentmodeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewjoinersrecruitmentmodeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewjoinersrecruitmentmodeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringteamOnboardingcompletedReportComponent } from './hiringteam-onboardingcompleted-report.component';

describe('HiringteamOnboardingcompletedReportComponent', () => {
  let component: HiringteamOnboardingcompletedReportComponent;
  let fixture: ComponentFixture<HiringteamOnboardingcompletedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringteamOnboardingcompletedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringteamOnboardingcompletedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

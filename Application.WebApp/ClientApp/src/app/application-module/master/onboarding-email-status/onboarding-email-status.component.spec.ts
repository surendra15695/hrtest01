import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingEmailStatusComponent } from './onboarding-email-status.component';

describe('OnboardingEmailStatusComponent', () => {
  let component: OnboardingEmailStatusComponent;
  let fixture: ComponentFixture<OnboardingEmailStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingEmailStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingEmailStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

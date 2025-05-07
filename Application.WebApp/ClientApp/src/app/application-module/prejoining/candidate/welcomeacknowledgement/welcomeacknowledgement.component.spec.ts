import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeacknowledgementComponent } from './welcomeacknowledgement.component';

describe('WelcomeacknowledgementComponent', () => {
  let component: WelcomeacknowledgementComponent;
  let fixture: ComponentFixture<WelcomeacknowledgementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeacknowledgementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeacknowledgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

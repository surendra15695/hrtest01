import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackStatusListComponent } from './feedback-status-list.component';

describe('FeedbackStatusListComponent', () => {
  let component: FeedbackStatusListComponent;
  let fixture: ComponentFixture<FeedbackStatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackStatusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

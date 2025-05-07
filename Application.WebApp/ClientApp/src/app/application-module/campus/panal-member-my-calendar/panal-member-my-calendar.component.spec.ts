import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanalMemberMyCalendarComponent } from './panal-member-my-calendar.component';

describe('PanalMemberMyCalendarComponent', () => {
  let component: PanalMemberMyCalendarComponent;
  let fixture: ComponentFixture<PanalMemberMyCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanalMemberMyCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanalMemberMyCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

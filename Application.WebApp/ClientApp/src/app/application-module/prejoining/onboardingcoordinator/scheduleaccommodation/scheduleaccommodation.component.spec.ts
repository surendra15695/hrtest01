import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleaccommodationComponent } from './scheduleaccommodation.component';

describe('ScheduleaccommodationComponent', () => {
  let component: ScheduleaccommodationComponent;
  let fixture: ComponentFixture<ScheduleaccommodationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleaccommodationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleaccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleaccommodationbatchComponent } from './scheduleaccommodationbatch.component';

describe('ScheduleaccommodationbatchComponent', () => {
  let component: ScheduleaccommodationbatchComponent;
  let fixture: ComponentFixture<ScheduleaccommodationbatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleaccommodationbatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleaccommodationbatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

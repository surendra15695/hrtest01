import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelistcalendarComponent } from './panelistcalendar.component';

describe('PanelistcalendarComponent', () => {
  let component: PanelistcalendarComponent;
  let fixture: ComponentFixture<PanelistcalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelistcalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelistcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

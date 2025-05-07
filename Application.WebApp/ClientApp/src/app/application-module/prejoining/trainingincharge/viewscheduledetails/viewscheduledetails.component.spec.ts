import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewscheduledetailsComponent } from './viewscheduledetails.component';

describe('ViewscheduledetailsComponent', () => {
  let component: ViewscheduledetailsComponent;
  let fixture: ComponentFixture<ViewscheduledetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewscheduledetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewscheduledetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

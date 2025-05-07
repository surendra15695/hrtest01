import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewaccommodationdetailsComponent } from './viewaccommodationdetails.component';

describe('ViewaccommodationdetailsComponent', () => {
  let component: ViewaccommodationdetailsComponent;
  let fixture: ComponentFixture<ViewaccommodationdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewaccommodationdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewaccommodationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

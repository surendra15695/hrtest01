import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReportingVenueComponent } from './manage-reporting-venue.component';

describe('ManageReportingVenueComponent', () => {
  let component: ManageReportingVenueComponent;
  let fixture: ComponentFixture<ManageReportingVenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageReportingVenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageReportingVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

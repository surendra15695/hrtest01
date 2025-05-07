import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInductionVenueComponent } from './manage-induction-venue.component';

describe('ManageInductionVenueComponent', () => {
  let component: ManageInductionVenueComponent;
  let fixture: ComponentFixture<ManageInductionVenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageInductionVenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageInductionVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

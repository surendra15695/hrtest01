import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalInductionVenueComponent } from './external-induction-venue.component';

describe('ExternalInductionVenueComponent', () => {
  let component: ExternalInductionVenueComponent;
  let fixture: ComponentFixture<ExternalInductionVenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalInductionVenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalInductionVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

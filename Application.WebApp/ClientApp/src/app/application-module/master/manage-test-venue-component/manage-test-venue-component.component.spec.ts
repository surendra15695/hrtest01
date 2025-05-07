import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTestVenueComponentComponent } from './manage-test-venue-component.component';

describe('ManageTestVenueComponentComponent', () => {
  let component: ManageTestVenueComponentComponent;
  let fixture: ComponentFixture<ManageTestVenueComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTestVenueComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTestVenueComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

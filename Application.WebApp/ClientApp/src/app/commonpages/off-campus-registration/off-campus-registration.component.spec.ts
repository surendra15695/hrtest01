import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffCampusRegistrationComponent } from './off-campus-registration.component';

describe('OffCampusRegistrationComponent', () => {
  let component: OffCampusRegistrationComponent;
  let fixture: ComponentFixture<OffCampusRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffCampusRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffCampusRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

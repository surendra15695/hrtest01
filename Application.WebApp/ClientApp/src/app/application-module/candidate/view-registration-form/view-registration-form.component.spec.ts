import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRegistrationFormComponent } from './view-registration-form.component';

describe('ViewRegistrationFormComponent', () => {
  let component: ViewRegistrationFormComponent;
  let fixture: ComponentFixture<ViewRegistrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRegistrationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

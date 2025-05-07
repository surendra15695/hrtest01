import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegistrationFormComponent } from './edit-registration-form.component';

describe('EditRegistrationFormComponent', () => {
  let component: EditRegistrationFormComponent;
  let fixture: ComponentFixture<EditRegistrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRegistrationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalaccidentpdfgenerationComponent } from './personalaccidentpdfgeneration.component';

describe('PersonalaccidentpdfgenerationComponent', () => {
  let component: PersonalaccidentpdfgenerationComponent;
  let fixture: ComponentFixture<PersonalaccidentpdfgenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalaccidentpdfgenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalaccidentpdfgenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

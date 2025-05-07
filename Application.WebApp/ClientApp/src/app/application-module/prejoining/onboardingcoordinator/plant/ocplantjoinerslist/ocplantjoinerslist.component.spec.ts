import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcplantjoinerslistComponent } from './ocplantjoinerslist.component';

describe('OcplantjoinerslistComponent', () => {
  let component: OcplantjoinerslistComponent;
  let fixture: ComponentFixture<OcplantjoinerslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcplantjoinerslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcplantjoinerslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

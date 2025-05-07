import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmplantjoinerslistComponent } from './omplantjoinerslist.component';

describe('OmplantjoinerslistComponent', () => {
  let component: OmplantjoinerslistComponent;
  let fixture: ComponentFixture<OmplantjoinerslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmplantjoinerslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmplantjoinerslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

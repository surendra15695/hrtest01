import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccorporatejoinerslistComponent } from './occorporatejoinerslist.component';

describe('OccorporatejoinerslistComponent', () => {
  let component: OccorporatejoinerslistComponent;
  let fixture: ComponentFixture<OccorporatejoinerslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccorporatejoinerslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccorporatejoinerslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

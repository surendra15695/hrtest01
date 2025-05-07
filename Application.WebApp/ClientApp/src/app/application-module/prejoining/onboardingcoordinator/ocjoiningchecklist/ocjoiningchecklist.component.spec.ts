import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcjoiningchecklistComponent } from './ocjoiningchecklist.component';

describe('OcjoiningchecklistComponent', () => {
  let component: OcjoiningchecklistComponent;
  let fixture: ComponentFixture<OcjoiningchecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcjoiningchecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcjoiningchecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcverifydocumentComponent } from './ocverifydocument.component';

describe('OcverifydocumentComponent', () => {
  let component: OcverifydocumentComponent;
  let fixture: ComponentFixture<OcverifydocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcverifydocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcverifydocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

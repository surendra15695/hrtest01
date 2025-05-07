import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcviewdocumentComponent } from './ocviewdocument.component';

describe('OcviewdocumentComponent', () => {
  let component: OcviewdocumentComponent;
  let fixture: ComponentFixture<OcviewdocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcviewdocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcviewdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

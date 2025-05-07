import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmviewdocumentComponent } from './omviewdocument.component';

describe('OmviewdocumentComponent', () => {
  let component: OmviewdocumentComponent;
  let fixture: ComponentFixture<OmviewdocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmviewdocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmviewdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

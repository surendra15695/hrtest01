import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OhviewdocumentComponent } from './ohviewdocument.component';

describe('OhviewdocumentComponent', () => {
  let component: OhviewdocumentComponent;
  let fixture: ComponentFixture<OhviewdocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OhviewdocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OhviewdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandholdingdocumentComponent } from './handholdingdocument.component';

describe('HandholdingdocumentComponent', () => {
  let component: HandholdingdocumentComponent;
  let fixture: ComponentFixture<HandholdingdocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandholdingdocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandholdingdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

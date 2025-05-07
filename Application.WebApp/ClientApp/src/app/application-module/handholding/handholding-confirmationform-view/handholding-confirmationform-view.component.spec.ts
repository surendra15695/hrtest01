import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandholdingConfirmationformViewComponent } from './handholding-confirmationform-view.component';

describe('HandholdingConfirmationformViewComponent', () => {
  let component: HandholdingConfirmationformViewComponent;
  let fixture: ComponentFixture<HandholdingConfirmationformViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandholdingConfirmationformViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandholdingConfirmationformViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

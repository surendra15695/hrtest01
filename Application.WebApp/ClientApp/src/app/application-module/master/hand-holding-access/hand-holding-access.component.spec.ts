import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandHoldingAccessComponent } from './hand-holding-access.component';

describe('HandHoldingAccessComponent', () => {
  let component: HandHoldingAccessComponent;
  let fixture: ComponentFixture<HandHoldingAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandHoldingAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandHoldingAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRHandHoldingComponent } from './hrhand-holding.component';

describe('HRHandHoldingComponent', () => {
  let component: HRHandHoldingComponent;
  let fixture: ComponentFixture<HRHandHoldingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRHandHoldingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRHandHoldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

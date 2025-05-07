import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrHandHoldingAccessComponent } from './hr-hand-holding-access.component';

describe('HrHandHoldingAccessComponent', () => {
  let component: HrHandHoldingAccessComponent;
  let fixture: ComponentFixture<HrHandHoldingAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrHandHoldingAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrHandHoldingAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

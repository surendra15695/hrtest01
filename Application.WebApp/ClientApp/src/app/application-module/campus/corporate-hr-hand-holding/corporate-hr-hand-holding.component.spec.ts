import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateHrHandHoldingComponent } from './corporate-hr-hand-holding.component';

describe('CorporateHrHandHoldingComponent', () => {
  let component: CorporateHrHandHoldingComponent;
  let fixture: ComponentFixture<CorporateHrHandHoldingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateHrHandHoldingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateHrHandHoldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

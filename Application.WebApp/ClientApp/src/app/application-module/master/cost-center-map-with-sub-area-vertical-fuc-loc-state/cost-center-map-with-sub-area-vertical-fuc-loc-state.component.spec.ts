import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterMapWithSubAreaVerticalFucLocStateComponent } from './cost-center-map-with-sub-area-vertical-fuc-loc-state.component';

describe('CostCenterMapWithSubAreaVerticalFucLocStateComponent', () => {
  let component: CostCenterMapWithSubAreaVerticalFucLocStateComponent;
  let fixture: ComponentFixture<CostCenterMapWithSubAreaVerticalFucLocStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCenterMapWithSubAreaVerticalFucLocStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterMapWithSubAreaVerticalFucLocStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

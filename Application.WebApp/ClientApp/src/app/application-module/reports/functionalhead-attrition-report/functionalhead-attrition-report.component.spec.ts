import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalheadAttritionReportComponent } from './functionalhead-attrition-report.component';

describe('FunctionalheadAttritionReportComponent', () => {
  let component: FunctionalheadAttritionReportComponent;
  let fixture: ComponentFixture<FunctionalheadAttritionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionalheadAttritionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalheadAttritionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

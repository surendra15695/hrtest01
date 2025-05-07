import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HropsattritionReportComponent } from './hropsattrition-report.component';

describe('HropsattritionReportComponent', () => {
  let component: HropsattritionReportComponent;
  let fixture: ComponentFixture<HropsattritionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HropsattritionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HropsattritionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

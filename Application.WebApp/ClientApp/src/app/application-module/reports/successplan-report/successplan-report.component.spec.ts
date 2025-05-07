import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessplanReportComponent } from './successplan-report.component';

describe('SuccessplanReportComponent', () => {
  let component: SuccessplanReportComponent;
  let fixture: ComponentFixture<SuccessplanReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessplanReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessplanReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

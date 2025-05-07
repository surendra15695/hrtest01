import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceWiseReportComponent } from './source-wise-report.component';

describe('SourceWiseReportComponent', () => {
  let component: SourceWiseReportComponent;
  let fixture: ComponentFixture<SourceWiseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceWiseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

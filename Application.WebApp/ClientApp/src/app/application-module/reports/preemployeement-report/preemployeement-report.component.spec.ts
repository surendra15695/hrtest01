import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreemployeementReportComponent } from './preemployeement-report.component';

describe('PreemployeementReportComponent', () => {
  let component: PreemployeementReportComponent;
  let fixture: ComponentFixture<PreemployeementReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreemployeementReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreemployeementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

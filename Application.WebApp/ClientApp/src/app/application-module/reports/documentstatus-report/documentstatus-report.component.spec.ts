import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentstatusReportComponent } from './documentstatus-report.component';

describe('DocumentstatusReportComponent', () => {
  let component: DocumentstatusReportComponent;
  let fixture: ComponentFixture<DocumentstatusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentstatusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentstatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

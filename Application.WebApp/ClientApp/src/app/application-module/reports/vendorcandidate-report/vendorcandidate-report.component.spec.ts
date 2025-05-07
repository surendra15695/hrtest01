import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorcandidateReportComponent } from './vendorcandidate-report.component';

describe('VendorcandidateReportComponent', () => {
  let component: VendorcandidateReportComponent;
  let fixture: ComponentFixture<VendorcandidateReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorcandidateReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorcandidateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatwisecabdidateFeedbakReportComponent } from './batwisecabdidate-feedbak-report.component';

describe('BatwisecabdidateFeedbakReportComponent', () => {
  let component: BatwisecabdidateFeedbakReportComponent;
  let fixture: ComponentFixture<BatwisecabdidateFeedbakReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatwisecabdidateFeedbakReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatwisecabdidateFeedbakReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

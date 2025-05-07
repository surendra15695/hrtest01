import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandholdingReportAllComponent } from './handholding-report-all.component';

describe('HandholdingReportAllComponent', () => {
  let component: HandholdingReportAllComponent;
  let fixture: ComponentFixture<HandholdingReportAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandholdingReportAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandholdingReportAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexiReportComponent } from './flexi-report.component';

describe('FlexiReportComponent', () => {
  let component: FlexiReportComponent;
  let fixture: ComponentFixture<FlexiReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexiReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexiReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewjoinersoverallverticalwiseReportComponent } from './newjoinersoverallverticalwise-report.component';

describe('NewjoinersoverallverticalwiseReportComponent', () => {
  let component: NewjoinersoverallverticalwiseReportComponent;
  let fixture: ComponentFixture<NewjoinersoverallverticalwiseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewjoinersoverallverticalwiseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewjoinersoverallverticalwiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewjoinerReportComponent } from './newjoiner-report.component';

describe('NewjoinerReportComponent', () => {
  let component: NewjoinerReportComponent;
  let fixture: ComponentFixture<NewjoinerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewjoinerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewjoinerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

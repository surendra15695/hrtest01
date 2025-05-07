import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationReportComponent } from './resignation-report.component';

describe('ResignationReportComponent', () => {
  let component: ResignationReportComponent;
  let fixture: ComponentFixture<ResignationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResignationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResignationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelocationReportComponent } from './relocation-report.component';

describe('RelocationReportComponent', () => {
  let component: RelocationReportComponent;
  let fixture: ComponentFixture<RelocationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelocationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelocationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

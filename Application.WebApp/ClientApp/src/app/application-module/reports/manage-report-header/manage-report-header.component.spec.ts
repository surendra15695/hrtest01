import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReportHeaderComponent } from './manage-report-header.component';

describe('ManageReportHeaderComponent', () => {
  let component: ManageReportHeaderComponent;
  let fixture: ComponentFixture<ManageReportHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageReportHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageReportHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

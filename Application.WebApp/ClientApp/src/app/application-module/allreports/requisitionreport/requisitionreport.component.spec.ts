import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionreportComponent } from './requisitionreport.component';

describe('RequisitionreportComponent', () => {
  let component: RequisitionreportComponent;
  let fixture: ComponentFixture<RequisitionreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

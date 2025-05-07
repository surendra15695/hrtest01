import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalheadrequisitionreportComponent } from './functionalheadrequisitionreport.component';

describe('FunctionalheadrequisitionreportComponent', () => {
  let component: FunctionalheadrequisitionreportComponent;
  let fixture: ComponentFixture<FunctionalheadrequisitionreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionalheadrequisitionreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalheadrequisitionreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

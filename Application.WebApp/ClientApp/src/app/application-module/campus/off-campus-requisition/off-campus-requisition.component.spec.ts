import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffCampusRequisitionComponent } from './off-campus-requisition.component';

describe('OffCampusRequisitionComponent', () => {
  let component: OffCampusRequisitionComponent;
  let fixture: ComponentFixture<OffCampusRequisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffCampusRequisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffCampusRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

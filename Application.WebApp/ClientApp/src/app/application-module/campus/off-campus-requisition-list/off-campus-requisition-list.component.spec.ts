import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffCampusRequisitionListComponent } from './off-campus-requisition-list.component';

describe('OffCampusRequisitionListComponent', () => {
  let component: OffCampusRequisitionListComponent;
  let fixture: ComponentFixture<OffCampusRequisitionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffCampusRequisitionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffCampusRequisitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

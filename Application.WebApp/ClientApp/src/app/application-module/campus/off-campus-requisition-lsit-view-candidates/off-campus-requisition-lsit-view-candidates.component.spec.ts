import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffCampusRequisitionLsitViewCandidatesComponent } from './off-campus-requisition-lsit-view-candidates.component';

describe('OffCampusRequisitionLsitViewCandidatesComponent', () => {
  let component: OffCampusRequisitionLsitViewCandidatesComponent;
  let fixture: ComponentFixture<OffCampusRequisitionLsitViewCandidatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffCampusRequisitionLsitViewCandidatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffCampusRequisitionLsitViewCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

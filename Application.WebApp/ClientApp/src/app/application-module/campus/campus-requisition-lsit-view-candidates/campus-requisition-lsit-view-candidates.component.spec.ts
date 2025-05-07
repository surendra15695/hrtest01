import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusRequisitionLsitViewCandidatesComponent } from './campus-requisition-lsit-view-candidates.component';

describe('CampusRequisitionLsitViewCandidatesComponent', () => {
  let component: CampusRequisitionLsitViewCandidatesComponent;
  let fixture: ComponentFixture<CampusRequisitionLsitViewCandidatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusRequisitionLsitViewCandidatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusRequisitionLsitViewCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

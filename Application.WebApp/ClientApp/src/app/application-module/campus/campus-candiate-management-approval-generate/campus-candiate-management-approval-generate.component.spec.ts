import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusCandiateManagementApprovalGenerateComponent } from './campus-candiate-management-approval-generate.component';

describe('CampusCandiateManagementApprovalGenerateComponent', () => {
  let component: CampusCandiateManagementApprovalGenerateComponent;
  let fixture: ComponentFixture<CampusCandiateManagementApprovalGenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusCandiateManagementApprovalGenerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusCandiateManagementApprovalGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

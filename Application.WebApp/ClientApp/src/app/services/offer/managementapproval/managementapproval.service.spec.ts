import { TestBed } from '@angular/core/testing';

import { ManagementapprovalService } from './managementapproval.service';

describe('ManagementapprovalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagementapprovalService = TestBed.get(ManagementapprovalService);
    expect(service).toBeTruthy();
  });
});

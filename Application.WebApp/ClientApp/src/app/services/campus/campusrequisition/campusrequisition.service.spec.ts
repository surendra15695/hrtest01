import { TestBed } from '@angular/core/testing';

import { CampusrequisitionService } from './campusrequisition.service';

describe('CampusrequisitionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CampusrequisitionService = TestBed.get(CampusrequisitionService);
    expect(service).toBeTruthy();
  });
});

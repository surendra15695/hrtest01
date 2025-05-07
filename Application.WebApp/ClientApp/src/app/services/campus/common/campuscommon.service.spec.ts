import { TestBed } from '@angular/core/testing';

import { CampuscommonService } from './campuscommon.service';

describe('CampuscommonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CampuscommonService = TestBed.get(CampuscommonService);
    expect(service).toBeTruthy();
  });
});

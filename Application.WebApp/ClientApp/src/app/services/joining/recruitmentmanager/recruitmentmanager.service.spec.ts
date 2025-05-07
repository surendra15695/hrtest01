import { TestBed } from '@angular/core/testing';

import { RecruitmentmanagerService } from './recruitmentmanager.service';

describe('RecruitmentmanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecruitmentmanagerService = TestBed.get(RecruitmentmanagerService);
    expect(service).toBeTruthy();
  });
});

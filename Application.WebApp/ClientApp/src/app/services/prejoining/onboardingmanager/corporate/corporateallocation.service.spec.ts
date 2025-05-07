import { TestBed } from '@angular/core/testing';

import { CorporateallocationService } from './corporateallocation.service';

describe('CorporateallocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorporateallocationService = TestBed.get(CorporateallocationService);
    expect(service).toBeTruthy();
  });
});

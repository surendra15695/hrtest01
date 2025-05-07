import { TestBed } from '@angular/core/testing';

import { SalesandmarketingallocationService } from './salesandmarketingallocation.service';

describe('SalesandmarketingallocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesandmarketingallocationService = TestBed.get(SalesandmarketingallocationService);
    expect(service).toBeTruthy();
  });
});

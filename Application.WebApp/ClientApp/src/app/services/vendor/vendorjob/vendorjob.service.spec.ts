import { TestBed } from '@angular/core/testing';

import { VendorjobService } from './vendorjob.service';

describe('VendorjobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendorjobService = TestBed.get(VendorjobService);
    expect(service).toBeTruthy();
  });
});

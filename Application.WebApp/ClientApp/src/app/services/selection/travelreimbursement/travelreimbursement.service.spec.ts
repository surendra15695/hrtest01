import { TestBed } from '@angular/core/testing';

import { TravelreimbursementService } from './travelreimbursement.service';

describe('TravelreimbursementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TravelreimbursementService = TestBed.get(TravelreimbursementService);
    expect(service).toBeTruthy();
  });
});

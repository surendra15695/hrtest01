import { TestBed } from '@angular/core/testing';

import { TraininginchargeService } from './trainingincharge.service';

describe('TraininginchargeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TraininginchargeService = TestBed.get(TraininginchargeService);
    expect(service).toBeTruthy();
  });
});

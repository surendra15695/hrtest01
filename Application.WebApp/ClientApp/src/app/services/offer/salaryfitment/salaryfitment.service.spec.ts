import { TestBed } from '@angular/core/testing';

import { SalaryfitmentService } from './salaryfitment.service';

describe('SalaryfitmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalaryfitmentService = TestBed.get(SalaryfitmentService);
    expect(service).toBeTruthy();
  });
});

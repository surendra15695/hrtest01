import { TestBed } from '@angular/core/testing';

import { PaystructureService } from './paystructure.service';

describe('PaystructureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaystructureService = TestBed.get(PaystructureService);
    expect(service).toBeTruthy();
  });
});

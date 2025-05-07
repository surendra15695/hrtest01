import { TestBed } from '@angular/core/testing';

import { SuccessionService } from './succession.service';

describe('SuccessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuccessionService = TestBed.get(SuccessionService);
    expect(service).toBeTruthy();
  });
});

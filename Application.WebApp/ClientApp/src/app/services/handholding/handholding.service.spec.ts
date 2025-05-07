import { TestBed } from '@angular/core/testing';

import { HandholdingService } from './handholding.service';

describe('HandholdingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HandholdingService = TestBed.get(HandholdingService);
    expect(service).toBeTruthy();
  });
});

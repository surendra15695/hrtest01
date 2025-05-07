import { TestBed } from '@angular/core/testing';

import { OfferletterService } from './offerletter.service';

describe('OfferletterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfferletterService = TestBed.get(OfferletterService);
    expect(service).toBeTruthy();
  });
});

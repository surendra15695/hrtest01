import { TestBed } from '@angular/core/testing';

import { OnboardingcoordinatorService } from './onboardingcoordinator.service';

describe('OnboardingcoordinatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnboardingcoordinatorService = TestBed.get(OnboardingcoordinatorService);
    expect(service).toBeTruthy();
  });
});

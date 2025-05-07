import { TestBed } from '@angular/core/testing';

import { InductionassessmentService } from './inductionassessment.service';

describe('InductionassessmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InductionassessmentService = TestBed.get(InductionassessmentService);
    expect(service).toBeTruthy();
  });
});

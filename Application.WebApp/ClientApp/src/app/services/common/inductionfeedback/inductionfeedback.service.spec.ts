import { TestBed } from '@angular/core/testing';

import { InductionfeedbackService } from './inductionfeedback.service';

describe('InductionfeedbackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InductionfeedbackService = TestBed.get(InductionfeedbackService);
    expect(service).toBeTruthy();
  });
});

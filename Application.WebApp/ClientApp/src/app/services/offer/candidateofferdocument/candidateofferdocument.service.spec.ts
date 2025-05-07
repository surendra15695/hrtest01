import { TestBed } from '@angular/core/testing';

import { CandidateofferdocumentService } from './candidateofferdocument.service';

describe('CandidateofferdocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CandidateofferdocumentService = TestBed.get(CandidateofferdocumentService);
    expect(service).toBeTruthy();
  });
});

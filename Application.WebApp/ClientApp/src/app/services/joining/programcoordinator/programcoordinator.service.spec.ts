import { TestBed } from '@angular/core/testing';

import { ProgramcoordinatorService } from './programcoordinator.service';

describe('ProgramcoordinatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgramcoordinatorService = TestBed.get(ProgramcoordinatorService);
    expect(service).toBeTruthy();
  });
});

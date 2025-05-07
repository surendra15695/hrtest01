import { TestBed } from '@angular/core/testing';

import { SalarytypenewService } from './salarytypenew.service';

describe('SalarytypenewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalarytypenewService = TestBed.get(SalarytypenewService);
    expect(service).toBeTruthy();
  });
});

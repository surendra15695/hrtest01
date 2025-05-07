import { TestBed } from '@angular/core/testing';

import { TestscheduleService } from './testschedule.service';

describe('TestscheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestscheduleService = TestBed.get(TestscheduleService);
    expect(service).toBeTruthy();
  });
});

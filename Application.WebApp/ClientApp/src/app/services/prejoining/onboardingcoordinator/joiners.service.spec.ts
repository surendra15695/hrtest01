import { TestBed } from '@angular/core/testing';

import { JoinersService } from './joiners.service';

describe('JoinersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JoinersService = TestBed.get(JoinersService);
    expect(service).toBeTruthy();
  });
});

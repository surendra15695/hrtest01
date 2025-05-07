import { TestBed } from '@angular/core/testing';

import { HiringteamService } from './hiringteam.service';

describe('HiringteamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HiringteamService = TestBed.get(HiringteamService);
    expect(service).toBeTruthy();
  });
});

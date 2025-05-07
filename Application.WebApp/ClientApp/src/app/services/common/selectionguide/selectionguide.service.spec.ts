import { TestBed } from '@angular/core/testing';

import { SelectionguideService } from './selectionguide.service';

describe('SelectionguideService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectionguideService = TestBed.get(SelectionguideService);
    expect(service).toBeTruthy();
  });
});

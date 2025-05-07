import { TestBed } from '@angular/core/testing';

import { EdmsService } from './edms.service';

describe('EdmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EdmsService = TestBed.get(EdmsService);
    expect(service).toBeTruthy();
  });
});

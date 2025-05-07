import { TestBed } from '@angular/core/testing';

import { PlantallocationService } from './plantallocation.service';

describe('PlantallocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlantallocationService = TestBed.get(PlantallocationService);
    expect(service).toBeTruthy();
  });
});

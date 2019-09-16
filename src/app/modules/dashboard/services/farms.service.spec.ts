import { TestBed } from '@angular/core/testing';

import { FarmsService } from './farms.service';

describe('FarmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FarmsService = TestBed.get(FarmsService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MapToolsService } from './map-tools.service';

describe('MapToolsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapToolsService = TestBed.get(MapToolsService);
    expect(service).toBeTruthy();
  });
});

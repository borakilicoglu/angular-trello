import { TestBed } from '@angular/core/testing';

import { IdeasService } from './ideas.service';

describe('IdeasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdeasService = TestBed.get(IdeasService);
    expect(service).toBeTruthy();
  });
});

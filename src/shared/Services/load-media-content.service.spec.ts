import { TestBed } from '@angular/core/testing';

import { LoadMediaContentService } from './load-media-content.service';

describe('LoadMediaContentService', () => {
  let service: LoadMediaContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadMediaContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

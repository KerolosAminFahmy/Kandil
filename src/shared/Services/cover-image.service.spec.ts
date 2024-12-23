import { TestBed } from '@angular/core/testing';

import { CoverImageService } from './cover-image.service';

describe('CoverImageService', () => {
  let service: CoverImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoverImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

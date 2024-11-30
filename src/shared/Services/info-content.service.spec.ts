import { TestBed } from '@angular/core/testing';

import { InfoContentService } from './info-content.service';

describe('InfoContentService', () => {
  let service: InfoContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

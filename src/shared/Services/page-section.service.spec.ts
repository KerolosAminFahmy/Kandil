import { TestBed } from '@angular/core/testing';

import { PageSectionService } from './page-section.service';

describe('PageSectionService', () => {
  let service: PageSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

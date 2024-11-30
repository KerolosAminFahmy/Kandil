import { TestBed } from '@angular/core/testing';

import { WhyusService } from './whyus.service';

describe('WhyusService', () => {
  let service: WhyusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhyusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

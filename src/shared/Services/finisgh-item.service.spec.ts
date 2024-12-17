import { TestBed } from '@angular/core/testing';

import { FinisghItemService } from './finisgh-item.service';

describe('FinisghItemService', () => {
  let service: FinisghItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinisghItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

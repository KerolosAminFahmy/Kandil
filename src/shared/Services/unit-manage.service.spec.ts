import { TestBed } from '@angular/core/testing';

import { UnitManageService } from './unit-manage.service';

describe('UnitManageService', () => {
  let service: UnitManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

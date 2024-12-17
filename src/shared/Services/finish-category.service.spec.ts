import { TestBed } from '@angular/core/testing';

import { FinishCategoryService } from './finish-category.service';

describe('FinishCategoryService', () => {
  let service: FinishCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinishCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

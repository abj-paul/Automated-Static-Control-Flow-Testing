import { TestBed } from '@angular/core/testing';

import { ResultStoreServiceService } from './result-store-service.service';

describe('ResultStoreServiceService', () => {
  let service: ResultStoreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultStoreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

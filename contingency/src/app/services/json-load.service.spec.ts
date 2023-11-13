import { TestBed } from '@angular/core/testing';

import { JsonLoadService } from './json-load.service';

describe('JsonLoadService', () => {
  let service: JsonLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ApiConverterService } from './api-converter.service';

describe('ApiDataConverterService', () => {
  let service: ApiConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

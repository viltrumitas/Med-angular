import { TestBed } from '@angular/core/testing';

import { CasesApi } from './cases-api';

describe('CasesApi', () => {
  let service: CasesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasesApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

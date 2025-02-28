import { TestBed } from '@angular/core/testing';

import { BimestreService } from './bimestre.service';

describe('BimestreService', () => {
  let service: BimestreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BimestreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ScrollSpyService, SPY_CONFIG } from './scroll-spy.service';

describe('ScrollSpyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SPY_CONFIG, useValue: { lookAhead: false } }]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(ScrollSpyService);
    expect(service).toBeTruthy();
  });
});

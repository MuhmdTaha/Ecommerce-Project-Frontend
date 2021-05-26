import { TestBed } from '@angular/core/testing';

import { SameUserGuardService } from './same-user-guard.service';

describe('SameUserGuardService', () => {
  let service: SameUserGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SameUserGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

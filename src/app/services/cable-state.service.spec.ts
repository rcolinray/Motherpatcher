import { TestBed, inject } from '@angular/core/testing';

import { CableStateService } from './cable-state.service';

describe('CableStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CableStateService]
    });
  });

  it('should be created', inject([CableStateService], (service: CableStateService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { Mother32StateService } from './mother32-state.service';

describe('Mother32Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Mother32StateService]
    });
  });

  it('should be created', inject([Mother32StateService], (service: Mother32StateService) => {
    expect(service).toBeTruthy();
  }));
});

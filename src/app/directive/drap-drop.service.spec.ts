import { TestBed, inject } from '@angular/core/testing';

import { DrapDropService } from './drap-drop.service';

describe('DrapDropService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrapDropService]
    });
  });

  it('should be created', inject([DrapDropService], (service: DrapDropService) => {
    expect(service).toBeTruthy();
  }));
});

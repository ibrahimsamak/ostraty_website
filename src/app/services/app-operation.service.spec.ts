import { TestBed, inject } from '@angular/core/testing';

import { AppOperationService } from './app-operation.service';

describe('AppOperationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppOperationService]
    });
  });

  it('should be created', inject([AppOperationService], (service: AppOperationService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { PhotoServiceService } from './photo.service';

describe('PhotoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotoServiceService = TestBed.get(PhotoServiceService);
    expect(service).toBeTruthy();
  });
});

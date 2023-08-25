import {TestBed} from '@angular/core/testing';

import {ImageService} from './image.service';

describe('ImageLoadService', () => {
  let service: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit imageLoaded event when onImageLoad() method is called', () => {
    spyOn(service.imageLoaded, 'emit');
    service.onImageLoad();
    expect(service.imageLoaded.emit).toHaveBeenCalled();
  });
});

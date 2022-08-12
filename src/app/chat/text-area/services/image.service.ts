import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  @Output() imageLoaded = new EventEmitter();

  onImageLoad() {
    this.imageLoaded.emit();
  }
}

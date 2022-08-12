import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[loadedEmitter]'
})
export class ImageLoadedDirective {
  @Output() loaded = new EventEmitter();

  @HostListener('load')
  onLoad() {
    this.loaded.emit();
  }

  constructor(private elRef: ElementRef<HTMLImageElement>) {
    if (this.elRef.nativeElement.complete) {
      this.onLoad();
    }
  }
}

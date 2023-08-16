import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appLoadedEmitter]'
})
export class ImageLoadedDirective {
  @Output() loaded = new EventEmitter();

  constructor(private elRef: ElementRef<HTMLImageElement>) {
    if (this.elRef.nativeElement.complete) {
      this.onLoad();
    }
  }

  @HostListener('load')
  onLoad() {
    this.loaded.emit();
  }
}

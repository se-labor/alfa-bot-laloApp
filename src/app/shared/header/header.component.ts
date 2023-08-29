import {AfterViewInit, Component, Input} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  @Input() title = "";
  originalFontSize: number;

  constructor() {
  }

  ngAfterViewInit() {
    window.addEventListener('resize', this.adjustFontSize.bind(this));
    const title = document.querySelector('.title');
    if (title) {
      this.originalFontSize = parseInt(
        window.getComputedStyle(title).fontSize
      );
    }
    // Call after Load Event, because the Mat-Icon is not loaded before
    window.addEventListener('load', this.adjustFontSize.bind(this));
  }

  adjustFontSize() {
    const toolbar = document.querySelector('mat-toolbar');
    const title = document.querySelector('.title');
    const button = document.querySelector('.btn');

    if (!toolbar || !title || !button) {
      return;
    }

    let toolbarWidth = toolbar.getBoundingClientRect().width;
    const titleWidth = title.getBoundingClientRect().width;
    const buttonWidth = title.getBoundingClientRect().width
    let combinedWidth = titleWidth + buttonWidth + 16; //Add 16px for padding
    let fontSize = parseInt(
      window.getComputedStyle(title).fontSize
    );

    if (combinedWidth > toolbarWidth) {
      while (combinedWidth > toolbarWidth && fontSize > 0) {
        fontSize--;
        title.setAttribute('style', `font-size: ${fontSize}px`);
        combinedWidth = title.getBoundingClientRect().width + buttonWidth;
        toolbarWidth = toolbar.getBoundingClientRect().width;
      }
    } else if (combinedWidth + 10 < toolbarWidth) { // Add 10px to avoid jumping
      if (fontSize < this.originalFontSize) {
        fontSize++;
        title.setAttribute('style', `font-size: ${fontSize}px`);
      } else {
        title.removeAttribute('style');
        this.originalFontSize = parseInt(window.getComputedStyle(title).fontSize);
      }
    }
  }

}

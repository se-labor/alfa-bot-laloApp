import {AfterViewInit, Component, Input} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  @Input() title = "";
  windowWidth: number;
  private originalFontSize: number = 0;

  constructor() {
  }

  ngAfterViewInit() {
    // Call after Load Event, because the Mat-Icon is not loaded before
    window.addEventListener('load', this.adjustFontSize.bind(this));
    window.addEventListener('resize', this.adjustFontSize.bind(this));
  }

  setWindowWidth() {
    this.windowWidth = window.innerWidth;
  }

  adjustFontSize() {
    if (this.windowWidth === window.innerWidth) { // Catch vertical resize to prevent resizing when scrolling on ios
      return;
    }

    this.setWindowWidth();
    const toolbar = document.querySelector('mat-toolbar');
    const title = document.querySelector('.title');
    const button = document.querySelector('.btn');

    if (!toolbar || !title || !button) {
      return;
    }

    let toolbarWidth = toolbar.getBoundingClientRect().width;
    const titleWidth = title.getBoundingClientRect().width;
    const buttonWidth = button.getBoundingClientRect().width;
    let combinedWidth = titleWidth + buttonWidth;
    let fontSize = parseInt(
      window.getComputedStyle(title).fontSize
    );
    if (this.originalFontSize === 0) {
      this.originalFontSize = fontSize;
    }
    console.log(toolbarWidth, titleWidth, buttonWidth, fontSize, this.originalFontSize);

    while (combinedWidth + 16 > toolbarWidth && fontSize > 0) {
      fontSize--;
      title.setAttribute('style', `font-size: ${fontSize}px`);
      combinedWidth = title.getBoundingClientRect().width + buttonWidth;
      toolbarWidth = toolbar.getBoundingClientRect().width;
    }

    while (combinedWidth + 30 < toolbarWidth && fontSize < this.originalFontSize) {
      fontSize++;
      title.setAttribute('style', `font-size: ${fontSize}px; line-height: ${fontSize}px`);
      combinedWidth = title.getBoundingClientRect().width + buttonWidth;
      toolbarWidth = toolbar.getBoundingClientRect().width;
    }
    if (fontSize >= this.originalFontSize) {
      title.removeAttribute('style');
    }
  }
}

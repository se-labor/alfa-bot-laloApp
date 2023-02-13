import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  public playbackSpeed: number = 0.8;
  public fontSize: number = 24;
  public playbackSpeedChanged = new Subject();
  public fontSizeChanged = new Subject();

  constructor() {
    document.body.style.fontSize = `${this.fontSize}px`;
    this.playbackSpeedChanged.subscribe((value: number) => {
      this.playbackSpeed = value;
    });
    this.fontSizeChanged.subscribe((value: number) => {
      this.fontSize = value;
    });
  }
}

import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  public playbackSpeed: number = 0.9;
  public fontSize: number = 18;
  public playbackSpeedChanged = new Subject();
  public fontSizeChanged = new Subject();

  constructor() {
    document.body.style.fontSize = `${this.fontSize}px`;
    this.playbackSpeedChanged.subscribe((value: number) => {
      this.playbackSpeed = value;
    });
    this.fontSizeChanged.subscribe((value: number) => {
      this.fontSize = value;
      document.body.style.fontSize = `${this.fontSize}px`
    });
  }
}

import {Component} from '@angular/core';
import {SettingService} from "../../../shared/services/setting.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(public settingService: SettingService) {
  }

  emitFontSizeChange(value: number) {
    this.settingService.fontSizeChanged.next(value);
  }

  emitPlaybackSpeedChange(value: number) {
    this.settingService.playbackSpeedChanged.next(value);
  }
}

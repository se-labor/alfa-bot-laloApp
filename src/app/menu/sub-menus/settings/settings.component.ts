import { Component, OnInit } from '@angular/core';
import {SettingService} from "../../../shared/services/setting.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public settingService: SettingService) { }

  ngOnInit(): void {
  }

  emitFontSizeChange(value: number) {
    this.settingService.fontSizeChanged.next(value);
  }

  emitPlaybackSpeedChange(value: number) {
    this.settingService.playbackSpeedChanged.next(value);
  }
}

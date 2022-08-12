import { Component, OnInit } from '@angular/core';
import {BotConfigService} from "../shared/services/bot-config.service";

@Component({
  selector: 'app-menue',
  templateUrl: './menue.component.html',
  styleUrls: ['./menue.component.scss']
})
export class MenueComponent implements OnInit {

  public chatBots = [];

  constructor(private botConfigService: BotConfigService) {
    this.chatBots = botConfigService.chatBots;
  }

  ngOnInit(): void {
  }

}

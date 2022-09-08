import { Component, OnInit } from '@angular/core';
import {BotService} from "../modules/api";
import {BotConfigService} from "../shared/services/bot-config.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private botService: BotService, private botConfigService: BotConfigService, private activatedRoute: ActivatedRoute) {

    let botId = activatedRoute.snapshot.url[1].path;
    let chatBot = botConfigService.chatBots.find(bot => bot.id === botId );
    this.botService.configuration.basePath = chatBot.apiUrl;
    this.botService.configuration.credentials['Authorization'] = chatBot.apiKey;
  }

  ngOnInit(): void {
  }

}

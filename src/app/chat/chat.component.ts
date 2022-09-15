import {Component, OnInit} from '@angular/core';
import {BotService} from "../modules/api";
import {BotConfigService} from "../shared/services/bot-config.service";
import {ActivatedRoute} from "@angular/router";
import {ChatBot} from "../shared/chat-bot.model";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public chatBot: ChatBot;
  constructor(private botService: BotService, private botConfigService: BotConfigService, private activatedRoute: ActivatedRoute) {

    let botId = activatedRoute.snapshot.url[1].path;
    this.chatBot = botConfigService.chatBots.find(bot => bot.id === botId );
    this.botService.configuration.basePath = this.chatBot.apiUrl;
    this.botService.configuration.credentials['Authorization'] = this.chatBot.apiKey;
  }

  ngOnInit(): void {}
}

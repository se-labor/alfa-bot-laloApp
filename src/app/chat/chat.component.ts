import {Component, OnInit} from '@angular/core';
import {BotService} from "../modules/api";
import {BotConfigService} from "../shared/services/bot-config.service";
import {ActivatedRoute} from "@angular/router";
import {ChatBot} from "../shared/models/chat-bot.model";
import {MessageService} from "./message.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public chatBot: ChatBot;

  constructor(
    private botService: BotService,
    private botConfigService: BotConfigService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    let botId = this.activatedRoute.snapshot.url[1]?.path;
    if (!botId) {
      return;
    }

    this.chatBot = this.botConfigService.chatBots.find(bot => bot.id === botId);

    this.botService.configuration.basePath = this.chatBot.apiUrl;
    this.botService.configuration.credentials['Authorization'] = this.chatBot.apiKey;

    this.messageService.init();
    let query = this.activatedRoute.snapshot.queryParams;
    if (query["event"] !== undefined && query['event'] === "surveyCompleted") {
      this.messageService.getResponsesFor("surveyCompleted");
    }
  }
}

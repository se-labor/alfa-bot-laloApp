import {AfterViewInit, Component} from '@angular/core';
import {TextToSpeechService} from "../shared/services/text-to-speech.service";
import {BotConfigService} from "../shared/services/bot-config.service";
import {ChatBot} from "../shared/models/chat-bot.model";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit {
  public chatBots: ChatBot[] = [];

  constructor(public textToSpeechService: TextToSpeechService, private botConfigService: BotConfigService) {
    this.chatBots = botConfigService.chatBots;
  }

  ngAfterViewInit(): void {
    this.chatBots = this.botConfigService.chatBots;
  }
}

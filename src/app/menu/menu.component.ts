import {Component, ViewChild} from '@angular/core';
import {BotConfigService} from "../shared/services/bot-config.service";
import {ChatBot} from "../shared/models/chat-bot.model";
import {TextToSpeechService} from "../shared/services/text-to-speech.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent{
  public chatBots:ChatBot[] = [];
  @ViewChild('swiper') swiper: HTMLElement | undefined;

  constructor(
    private botConfigService: BotConfigService,
    public textToSpeechService: TextToSpeechService
  ) {
    this.chatBots = botConfigService.chatBots;
  }
}

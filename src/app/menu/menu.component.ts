import {Component} from '@angular/core';
import {BotConfigService} from "../shared/services/bot-config.service";
import {ChatBot} from "../shared/models/chat-bot.model";
import {TextToSpeechService} from "../shared/services/text-to-speech.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  public chatBots = [];
  public activeChatBot: ChatBot;

  constructor(
    private botConfigService: BotConfigService,
    public textToSpeechService: TextToSpeechService
  ) {
    this.chatBots = botConfigService.chatBots;
    this.activeChatBot = this.chatBots[0] ?? null;
  }

  swapActiveChatBot(next: boolean) {
    if (!this.activeChatBot) {return;}

    const index = this.chatBots.indexOf(this.activeChatBot);
    this.activeChatBot = this.chatBots[(index + (next ? 1 : -1) + this.chatBots.length) % this.chatBots.length];
  }
}

import { Injectable } from '@angular/core';
import {ChatBot} from "../chat-bot.model";

@Injectable({
  providedIn: 'root'
})
export class BotConfigService {

  public readonly chatBots: ChatBot[];

  constructor() {
    window['env'] = window['env'] || {};
    this.chatBots = ('BOT_CONFIG' in window['env']) ? window['env']['BOT_CONFIG'] : [];
  }
}

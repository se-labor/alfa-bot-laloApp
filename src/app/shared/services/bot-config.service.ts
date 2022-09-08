import { Injectable } from '@angular/core';
import {ChatBot} from "../chat-bot.model";

@Injectable({
  providedIn: 'root'
})
export class BotConfigService {

  public chatBots: ChatBot[] = window['env']['BOT_CONFIG'];

  constructor() {

  }



}

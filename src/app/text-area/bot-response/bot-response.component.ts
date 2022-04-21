import {Component, Input, OnInit} from '@angular/core';
import {BotButton, BotResponse} from "../../api";
import {BOT_RESPONSE_TYPE} from "../../shared/app-enums.model";

@Component({
  selector: 'app-bot-response',
  templateUrl: './bot-response.component.html',
  styleUrls: ['./bot-response.component.scss']
})
export class BotResponseComponent implements OnInit {
  @Input() botResponse: BotResponse = {message: '', imageUrl: '', buttons: []};
  BOT_RESPONSE_TYPE_ENUM = BOT_RESPONSE_TYPE;
  constructor() { }

  ngOnInit(): void {
  }

  determineType(botResponse: BotResponse): string {
    if (botResponse.message !== '') {
      if (botResponse.imageUrl !== '') {
        return this.BOT_RESPONSE_TYPE_ENUM.BUTTONS_AND_TEXT;
      } else {
        return this.BOT_RESPONSE_TYPE_ENUM.TEXT;
      }
    } else if (botResponse.imageUrl !== '') {
      return BOT_RESPONSE_TYPE.IMAGE;
    } else if (botResponse.buttons.length > 0) {
      return BOT_RESPONSE_TYPE.BUTTONS;
    } else {
      return BOT_RESPONSE_TYPE.TEXT;
    }
  }

  onButtonClick(button: BotButton) {

  }
}

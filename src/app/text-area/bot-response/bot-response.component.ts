import {Component, Input, OnInit} from '@angular/core';
import {BotResponse} from "../../api";
import {BOT_RESPONSE_TYPE} from "../../shared/app-enums.model";

@Component({
  selector: 'app-bot-response',
  templateUrl: './bot-response.component.html',
  styleUrls: ['./bot-response.component.scss']
})
export class BotResponseComponent implements OnInit {
  BOT_RESPONSE_TYPE_ENUM = BOT_RESPONSE_TYPE;
  @Input() botResponse: BotResponse = {message: '', imageUrl: '', buttons: []};
  constructor() { }

  ngOnInit(): void {
  }

  determineType(botResponse: BotResponse): string {
    if (botResponse.imageUrl) {
      return BOT_RESPONSE_TYPE.IMAGE;
    } else if (botResponse.buttons.length > 0) {
      return BOT_RESPONSE_TYPE.BUTTONS;
    } else {
      return BOT_RESPONSE_TYPE.TEXT;
    }
  }
}

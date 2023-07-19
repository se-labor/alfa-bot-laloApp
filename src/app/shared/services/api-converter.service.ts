import {Injectable} from '@angular/core';
import {BotButton, BotResponse, UserMessage} from "../../modules/api";
import {Message} from "../models/message.model";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ApiConverterService {

  constructor(private userService: UserService) {
  }

  getUserMessageFrom(text: string = '', payload: string = '', imageUrl: string = '', buttons: Array<BotButton> = []): Message {
    // For User Messages, the payload is the same as the text
    if (text !== '' && payload === '') {
      payload = text;
    }
    return new Message(this.userService.getUUID(), text, payload, imageUrl, buttons);
  }

  botResponseToMessage(botResponse: BotResponse): Message {
    // Values can not be undefined, so we need to check if they are and set them to empty strings or empty arrays
    let text = botResponse.message ? botResponse.message : '';
    let imageUrl = botResponse.imageUrl ? botResponse.imageUrl : '';
    let buttons = botResponse.buttons ? botResponse.buttons : [];
    return new Message(
      this.userService.getUUID(),
      text,
      '',
      imageUrl,
      buttons);
  };

  messageToUserMessage(message: Message): UserMessage {
    return {
      identifier: message.identifier,
      content: message.text
    };
  }

  buttonToUserMessage(message: Message): UserMessage {
    return {
      identifier: message.identifier,
      content: message.payload
    };
  }

  messageFromButton(button: BotButton) {
    return this.getUserMessageFrom(button.title, button.payload);
  }
}

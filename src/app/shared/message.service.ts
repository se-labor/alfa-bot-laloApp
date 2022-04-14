import {Injectable} from '@angular/core';
import {BotResponse, UserMessage} from "../api";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  userMessages: UserMessage[] = [];
  botResponses: BotResponse[] = [];
  constructor() {
/*    this.botService.getInitialBotMessage(this.userService.getUUID()).subscribe(
      (response: BotResponse[]) => {
        this.botResponses = response;
      }
    );
    console.log(this.botResponses);*/
  }
}

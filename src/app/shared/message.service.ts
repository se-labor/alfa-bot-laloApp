import {Injectable} from '@angular/core';
import {BotResponse, BotService, UserMessage} from "../api";
import {Subject} from "rxjs";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MessageService{
  private messages: (UserMessage | BotResponse)[] = [];
  public listChanged = new Subject<(UserMessage | BotResponse)[]>();
  constructor(private botService: BotService) {}

  processUserMessage(message: UserMessage) {
    // Safe User Message
    this.messages.push(message);
    // Safe all Bot Responses
    this.botService.sendUserMessage(message).pipe(first()).subscribe(
      (botResponses: BotResponse[]) => {
        for (const botResponse of botResponses) {
          this.messages.push(botResponse);
        }
        this.listChanged.next(this.messages.slice());
      });
  }

  getMessages(): (UserMessage | BotResponse)[] {
    return this.messages.slice();
  }

}

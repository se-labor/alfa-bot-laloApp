import {Injectable} from '@angular/core';
import {BotResponse, BotService, UserMessage} from "../../modules/api";
import {Subject} from "rxjs";
import {first} from "rxjs/operators";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService{
  private messages: (UserMessage | BotResponse)[] = [];
  private messageQueue: UserMessage[] = [];

  public listChanged = new Subject<(UserMessage | BotResponse)[]>();

  constructor(private botService: BotService, private userService: UserService) {
    this.botService.getInitialBotMessage(this.userService.getUUID()).pipe(first()).subscribe(
      (responses: BotResponse[]) => {
        this.messages.push(...responses);
        this.listChanged.next(this.messages.slice());
      }
    );
  }

  public sendMessage(message: UserMessage) {
    if (this.messageQueue.length === 0) {
      this.messageQueue.push(message);
      this.processNextUserMessage();
    }
    else {
      this.messageQueue.push(message);
    }
  }

  private processNextUserMessage() {
    if (this.messageQueue.length > 0) {
      this.processUserMessage(this.messageQueue[0]);
    }
  }

  private processUserMessage(message: UserMessage) {
    // Convert and safe User Message
    this.messages.push(message);
    this.listChanged.next(this.messages.slice());

    // Safe all Bot Responses
    this.botService.sendUserMessage(message).pipe(first()).subscribe(
      (responses: BotResponse[]) => {
        this.messages.push(...responses);
        this.listChanged.next(this.messages.slice());
        this.messageQueue.shift();
        this.processNextUserMessage();
   });
  }

  getMessages(): (UserMessage | BotResponse)[] {
    return this.messages.slice();
  }
}

import {Injectable} from '@angular/core';
import {BotResponse, BotService} from "../modules/api";
import {Subject} from "rxjs";
import {first} from "rxjs/operators";
import {UserService} from "../shared/services/user.service";
import {ApiConverterService} from "../shared/services/api-converter.service";
import {Message} from "../shared/models/message.model";

@Injectable({
  providedIn: 'root'
})
export class MessageService{

  private messages: Message[] = [];
  private messageQueue: Message[] = [];

  public listChanged = new Subject<Message>();

  constructor(
    private botService: BotService,
    private userService: UserService,
    private apiDataConverterService: ApiConverterService
  ) { }

  init() {
    // clear messages
    this.messages.splice(0, this.messages.length);
    this.botService.getInitialBotMessage(this.userService.getUUID()).pipe(first()).subscribe(
      (responses: BotResponse[]) => {
        responses.forEach(response => {
          let message = this.apiDataConverterService.botResponseToMessage(response);
          this.messages.push(message);
          this.listChanged.next(message);
        });
      }
    );
  }

  public sendMessage(message: Message) {
    if (this.messageQueue.length === 0) {
      this.processMessage(message);
    } else {
      this.messageQueue.push(message);
    }
  }

  private processNextMessage() {
    if (this.messageQueue.length > 0) {
      this.processMessage(this.messageQueue[0]);
    }
  }

  private processMessage(message: Message) {
    // Convert and safe User Message
    this.messages.push(message);
    this.listChanged.next(message);

    // Safe all Bot Responses
    this.botService.sendUserMessage(this.apiDataConverterService.messageToUserMessage(message)).pipe(first()).subscribe(
      (responses: BotResponse[]) => {
        responses.forEach(response => {
          let message = this.apiDataConverterService.botResponseToMessage(response);
          this.messages.push(message);
          this.listChanged.next(message);
        });
        this.messageQueue.shift();
        this.processNextMessage();
   });
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }
}

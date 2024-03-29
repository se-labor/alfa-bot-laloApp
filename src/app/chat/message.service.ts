import {Injectable} from '@angular/core';
import {BotResponse, BotService, UserMessage} from "../modules/api";
import {Subject} from "rxjs";
import {first} from "rxjs/operators";
import {UserService} from "../shared/services/user.service";
import {ApiConverterService} from "../shared/services/api-converter.service";
import {Message} from "../shared/models/message.model";
import {ResponseButtonService} from "./text-area/services/response-button.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public listChanged = new Subject<Message>();
  private messages: Message[] = [];
  private messageQueue: Message[] = [];

  constructor(
    private botService: BotService,
    private userService: UserService,
    private apiDataConverterService: ApiConverterService,
    private responseButtonService: ResponseButtonService
  ) {
  }

  init() {
    // clear messages
    this.messages.splice(0, this.messages.length);
    this.botService.getInitialBotMessage(this.userService.getUUID()).pipe(first()).subscribe(
      (responses: BotResponse[]) => {
        responses.forEach(response => {
          const message = this.apiDataConverterService.botResponseToMessage(response);
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

  public getResponsesFor(message: string) {
    const userMessage: UserMessage = {identifier: this.userService.getUUID(), content: message};
    // Safe all Bot Responses
    this.botService.sendUserMessage(userMessage).pipe(first()).subscribe(
      (responses: BotResponse[]) => {
        responses.forEach(response => {
          const message = this.apiDataConverterService.botResponseToMessage(response);
          this.messages.push(message);
          this.listChanged.next(message);
        });
      });
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  private processNextMessage() {
    if (this.messageQueue.length > 0) {
      this.processMessage(this.messageQueue[0]);
    }
  }

  private processMessage(message: Message) {
    this.responseButtonService.disableButtons();
    // Convert and safe User Message
    this.messages.push(message);
    this.listChanged.next(message);

    // Safe all Bot Responses
    if (message.text != message.payload) {
      this.botService.sendUserMessage(this.apiDataConverterService.buttonToUserMessage(message)).pipe(first()).subscribe(
        (responses: BotResponse[]) => {
          responses.forEach(response => {
            const message = this.apiDataConverterService.botResponseToMessage(response);
            this.messages.push(message);
            this.listChanged.next(message);
          });
          this.messageQueue.shift();
          this.processNextMessage();
        });
    } else {
      this.botService.sendUserMessage(this.apiDataConverterService.messageToUserMessage(message)).pipe(first()).subscribe(
        (responses: BotResponse[]) => {
          responses.forEach(response => {
            const message = this.apiDataConverterService.botResponseToMessage(response);
            this.messages.push(message);
            this.listChanged.next(message);
          });
          this.messageQueue.shift();
          this.processNextMessage();
        });
    }
  }
}

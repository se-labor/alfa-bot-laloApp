import {Injectable} from '@angular/core';
import {BotResponse, BotService, UserMessage} from "../../modules/api";
import {Subject} from "rxjs";
import {first} from "rxjs/operators";
import {IndexedBotResponse} from "../models/indexed-bot-response.model";
import {IndexedUserMessage} from "../models/indexed-user-message.model";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService{
  private index: number = 0;
  private messages: (UserMessage | BotResponse)[] = [];
  public listChanged = new Subject<(UserMessage | BotResponse)[]>();

  constructor(private botService: BotService, private userService: UserService) {
    this.botService.getInitialBotMessage(this.userService.getUUID()).pipe(first()).subscribe(
      (response: BotResponse[]) => {
        const indexedResponses = this.convertToIndexedBotResponses(response);
        this.messages.push(...indexedResponses);
        this.listChanged.next(this.messages.slice());
      }
    );
  }

  processUserMessage(message: UserMessage) {
    // Convert and safe User Message
    const indexedMessage = this.convertToIndexedUserMessage(message);
    this.messages.push(indexedMessage);
    this.listChanged.next(this.messages.slice());

    // Safe all Bot Responses
    this.botService.sendUserMessage(message).pipe(first()).subscribe(
      (response: BotResponse[]) => {
        const indexedResponses = this.convertToIndexedBotResponses(response);
        this.messages.push(...indexedResponses);
        this.listChanged.next(this.messages.slice());
      }
    );
  }

  getMessages(): (UserMessage | BotResponse)[] {
    return this.messages.slice();
  }

  convertToIndexedBotResponse(botResponse: BotResponse): IndexedBotResponse {
    return {index: this.index++, ...botResponse};
  }

  convertToIndexedUserMessage(userMessage: UserMessage): IndexedUserMessage {
    return {index: this.index++, ...userMessage};
  }

  convertToIndexedBotResponses(botResponses: BotResponse[]): IndexedBotResponse[] {
    return botResponses.map(botResponse => this.convertToIndexedBotResponse(botResponse));
  }
}

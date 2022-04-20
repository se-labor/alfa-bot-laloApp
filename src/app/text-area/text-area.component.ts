import {Component, OnDestroy, OnInit} from '@angular/core';
import {BotResponse, UserMessage} from "../api";
import {MessageService} from "../shared/message.service";
import {Subscription} from "rxjs";
import {MESSAGE_TYPE} from "../shared/app-enums.model";

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit, OnDestroy {
  MESSAGE_TYPE_ENUM = MESSAGE_TYPE;
  messages: (BotResponse | UserMessage)[] = [];
  private messageSubscription: Subscription = new Subscription();
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
     this.messageSubscription = this.messageService.listChanged.subscribe((messageList) => {
      this.messages = messageList;
    });
  }

  determineMessageType(message: BotResponse | UserMessage): string {
    if ( "buttons" in message ) {
      return MESSAGE_TYPE.BOT;
    } else {
      return MESSAGE_TYPE.USER;
    }
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }
}

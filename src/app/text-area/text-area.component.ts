import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BotResponse, UserMessage} from "../modules/api";
import {MessageService} from "../shared/services/message.service";
import {Subscription} from "rxjs";
import {MESSAGE_TYPE} from "../shared/models/app-enums.model";
import {ImageService} from "./services/image.service";

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit, OnDestroy, AfterViewChecked  {
  @ViewChild('messageList') private myScrollContainer: ElementRef;
  private messages: (BotResponse | UserMessage)[] = [];
  private messageSubscription: Subscription = new Subscription();
  public MESSAGE_TYPE_ENUM = MESSAGE_TYPE;
  constructor(private messageService: MessageService,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
     this.messageSubscription = this.messageService.listChanged.subscribe((messageList) => {
      this.messages = messageList;
    });
     this.imageService.imageLoaded.subscribe(() => {
       this.scrollToBottom();
     });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
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


import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BotResponse, UserMessage} from "../../modules/api";
import {MessageService} from "../message.service";
import {Subscription} from "rxjs";
import {MESSAGE_TYPE} from "../../shared/models/app-enums.model";
import {ImageService} from "./services/image.service";

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit, OnDestroy, AfterViewChecked  {
  @ViewChild('messageList') private myScrollContainer: ElementRef;
  public messages: (BotResponse | UserMessage)[] = [];
  public MESSAGE_TYPE_ENUM = MESSAGE_TYPE; // Needs to be redefined to be accessible in template
  private messageSubscription: Subscription;
  constructor(private messageService: MessageService,
              private imageService: ImageService) {}

  ngOnInit() {
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

  scrollToBottom() {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

  determineMessageType(message: BotResponse | UserMessage): string {
    if ( "buttons" in message ) {
      return MESSAGE_TYPE.BOT;
    } else {
      return MESSAGE_TYPE.USER;
    }
  }

  ngOnDestroy() {
    if(this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}


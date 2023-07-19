import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "../message.service";
import {Subscription} from "rxjs";
import {MESSAGE_TYPE} from "../../shared/models/app-enums.model";
import {ImageService} from "./services/image.service";
import {Message} from "../../shared/models/message.model";

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit, OnDestroy, AfterViewChecked {
  public messages: Message[] = [];
  public MESSAGE_TYPE_ENUM = MESSAGE_TYPE; // Needs to be redefined to be accessible in template
  @ViewChild('messageList') private myScrollContainer: ElementRef;
  private messageSubscription: Subscription;

  constructor(private messageService: MessageService,
              private imageService: ImageService) {
  }

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.messageSubscription = this.messageService.listChanged.subscribe((message) => {
      this.messages.push(message);
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

  determineMessageType(message: Message): string {
    if (message.payload === '') {
      return MESSAGE_TYPE.BOT;
    } else {
      return MESSAGE_TYPE.USER;
    }
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}


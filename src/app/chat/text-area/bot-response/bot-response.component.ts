import {Component, Input, OnInit} from '@angular/core';
import {BotButton} from "../../../modules/api";
import {BOT_RESPONSE_TYPE} from "../../../shared/models/app-enums.model";
import {MessageService} from "../../message.service";
import {UserService} from "../../../shared/services/user.service";
import {ImageService} from "../services/image.service";
import {TextToSpeechService} from "../../../shared/services/text-to-speech.service";
import {Message} from "../../../shared/models/message.model";
import {ApiConverterService} from "../../../shared/services/api-converter.service";
import {ResponseButtonService} from "../services/response-button.service";

@Component({
  selector: 'app-bot-response',
  templateUrl: './bot-response.component.html',
  styleUrls: ['./bot-response.component.scss']
})
export class BotResponseComponent implements OnInit {
  @Input() message: Message;
  public TYPE = BOT_RESPONSE_TYPE;  // Needs to be redefined to be accessible in template
  public responseType: string;
  public showVoiceOutputButton: boolean;
  public responseTypeString: string;
  @Input() public responseButtonsDisabled: boolean;

  constructor(private messageService: MessageService,
              private userService: UserService,
              private imageService: ImageService,
              private responseButtonService: ResponseButtonService,
              private apiConverterService: ApiConverterService,
              public textToSpeechService: TextToSpeechService) {
  }

  ngOnInit() {
    this.responseType = this.determineType(this.message);
    this.responseTypeString = this.responseType.toString();
    this.showVoiceOutputButton = this.responseType !== BOT_RESPONSE_TYPE.IMAGE;
    this.responseButtonService.disableResponseButtons.subscribe(() => {
      this.responseButtonsDisabled = true;
    });
  }

  determineType(message: Message): string {
    if (message.buttons.length > 0) {
      if (message.text !== '') {
        return this.TYPE.BUTTONS_AND_TEXT;
      } else {
        return this.TYPE.BUTTONS;
      }
    } else if (message.text !== '') {
      return this.TYPE.TEXT;
    } else {
      return this.TYPE.IMAGE;
    }
  }

  onButtonClick(button: BotButton) {
    this.messageService.sendMessage(this.apiConverterService.messageFromButton(button));
    this.responseButtonsDisabled = true;
  }

  onImageLoad() {
    this.imageService.onImageLoad();
  }
}

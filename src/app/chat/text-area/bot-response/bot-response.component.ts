import {Component, Input, OnInit} from '@angular/core';
import {BotButton, BotResponse} from "../../../modules/api";
import {BOT_RESPONSE_TYPE} from "../../app-enums.model";
import {MessageService} from "../../message.service";
import {UserService} from "../../../shared/services/user.service";
import {ImageService} from "../services/image.service";
import {TextToSpeechService} from "../../../shared/services/text-to-speech.service";

@Component({
  selector: 'app-bot-response',
  templateUrl: './bot-response.component.html',
  styleUrls: ['./bot-response.component.scss']
})
export class BotResponseComponent implements OnInit {
  @Input() botResponse: BotResponse = {message: '', imageUrl: '', buttons: []};
  public BOT_RESPONSE_TYPE_ENUM = BOT_RESPONSE_TYPE;  // Needs to be redefined to be accessible in template
  public responseType;
  public showVoiceOutputButton;
  public responseTypeString: String;
  public responseButtonDisabled= new Map<BotButton, boolean>();

  constructor(private messageService: MessageService,
              private userService: UserService,
              private imageService: ImageService,
              public textToSpeechService: TextToSpeechService) { }

  ngOnInit() {
    this.responseType = this.determineType(this.botResponse);
    this.responseTypeString = this.responseType.toString();
    this.showVoiceOutputButton =this.responseType !== BOT_RESPONSE_TYPE.IMAGE;
    this.botResponse.buttons.forEach(button => {
      this.responseButtonDisabled.set(button, false);
    });
  }

  determineType(botResponse: BotResponse): string {
    if (botResponse.message !== '') {
      if (botResponse.buttons.length > 0) {
        return this.BOT_RESPONSE_TYPE_ENUM.BUTTONS_AND_TEXT;
      } else {
        return this.BOT_RESPONSE_TYPE_ENUM.TEXT;
      }
    } else if (botResponse.imageUrl !== '') {
      return BOT_RESPONSE_TYPE.IMAGE;
    } else if (botResponse.buttons.length > 0) {
      return BOT_RESPONSE_TYPE.BUTTONS;
    } else {
      return BOT_RESPONSE_TYPE.TEXT;
    }
  }

  onButtonClick(button: BotButton) {
    this.messageService.sendMessage({identifier: this.userService.getUUID(), content: button.title});
    this.responseButtonDisabled.set(button, true);
  }

  onImageLoad() {
    this.imageService.onImageLoad();
  }
}

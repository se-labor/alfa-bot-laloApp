import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MessageService} from "../shared/services/message.service";
import {UserService} from "../shared/services/user.service";
import {SpeechToTextService} from "./services/speech-to-text.service";

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputAreaComponent implements OnInit {

  private voiceInputActive: boolean = false;
  constructor(private messageService: MessageService,
              private userService: UserService,
              private speechRecognitionService: SpeechToTextService) { }

  ngOnInit(): void {
    this.speechRecognitionService.init();
  }

  onSubmit(form: NgForm) {
    this.messageService.processUserMessage({identifier: this.userService.getUUID(), content: form.value.message});
    form.reset();
  }

  onVoiceInput() {}
}

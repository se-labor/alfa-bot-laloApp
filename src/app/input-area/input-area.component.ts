import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MessageService} from "../shared/message.service";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputAreaComponent implements OnInit {

  constructor(private messageService: MessageService, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.messageService.processUserMessage({identifier: this.userService.getUUID(), content: form.value.message});
    form.reset();
  }

  onVoiceInput() {

  }
}

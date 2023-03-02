import {Component, ViewEncapsulation} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MessageService} from "../message.service";
import {ApiConverterService} from "../../shared/services/api-converter.service";

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputAreaComponent{

  constructor(private messageService: MessageService,
              private apiConverterService: ApiConverterService) { }

  onSubmit(form: NgForm) {
    if (form.value.message) {
      this.messageService.sendMessage(this.apiConverterService.getUserMessageFrom(form.value.message));
      form.reset();
    }
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {UserMessage} from "../../../modules/api";

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.scss']
})
export class UserMessageComponent implements OnInit {
  @Input() userMessage: UserMessage = {identifier: '', content: ''};
  constructor() { }

  ngOnInit() {
  }
}


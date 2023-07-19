import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../shared/models/message.model";

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.scss']
})
export class UserMessageComponent implements OnInit {
  @Input() message: Message;

  constructor() {
  }

  ngOnInit() {
  }
}


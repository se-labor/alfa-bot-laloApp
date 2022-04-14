import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.scss']
})
export class UserMessageComponent implements OnInit {
  message: string = '';
  constructor() { }

  ngOnInit(): void {
/*    this.botService.getInitialBotMessage(this.userService.getUUID(), "body").subscribe(
      (response: BotResponse[]) => {
        this.message = response[0].message;
      }
    );*/
  }

}

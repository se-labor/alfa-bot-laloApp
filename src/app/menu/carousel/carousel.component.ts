import {Component, ViewEncapsulation} from '@angular/core';
import {ChatBot} from "../../shared/models/chat-bot.model";
import {BotConfigService} from "../../shared/services/bot-config.service";
import {NgbCarouselConfig, NgbSlideEvent} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent {
  public index = 0;
  public chatBots: ChatBot[] = [];


  constructor(private botConfigService: BotConfigService, private config: NgbCarouselConfig) {
    this.chatBots = botConfigService.chatBots;
    config.interval = 0;
  }

  indexChanged($event: NgbSlideEvent) {
    if (!$event.current.startsWith('ngb-slide-')) {
      return;
    }
    // Catch error, which could occur, if the user changes the slide name manually
    try {
      this.index = parseInt($event.current.replace('ngb-slide-', '')) % this.chatBots.length;
    } catch (ignored) {
      // Do nothing
    }
  }
}

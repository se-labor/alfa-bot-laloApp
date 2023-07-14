import {Component, ViewEncapsulation} from '@angular/core';
import {ChatBot} from "../../shared/models/chat-bot.model";
import {BotConfigService} from "../../shared/services/bot-config.service";
import {NgbCarouselConfig, NgbSlideEvent} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [NgbCarouselConfig], // add NgbCarouselConfig to the component providers
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent{
  index = 0;
  public chatBots:ChatBot[] = [];


  constructor(private botConfigService: BotConfigService, private config: NgbCarouselConfig) {
    this.chatBots = botConfigService.chatBots;
    config.interval = 0;
  }

  idChanged($event: NgbSlideEvent) {
    if (!$event.current.startsWith('ngb-slide-' )) {
      return;
    }
    this.index = parseInt($event.current.replace('ngb-slide-', ''));
  }
}

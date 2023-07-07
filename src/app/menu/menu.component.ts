import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {BotConfigService} from "../shared/services/bot-config.service";
import {ChatBot} from "../shared/models/chat-bot.model";
import {TextToSpeechService} from "../shared/services/text-to-speech.service";
import KeenSlider, { KeenSliderInstance } from "keen-slider";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [
    '../../../node_modules/keen-slider/keen-slider.min.css',
    './menu.component.scss']
})
export class MenuComponent implements AfterViewInit, OnDestroy{
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>
  public chatBots:ChatBot[] = [];
  public activeChatBot: ChatBot;

  constructor(
    private botConfigService: BotConfigService,
    public textToSpeechService: TextToSpeechService
  ) {
    this.chatBots = botConfigService.chatBots;
  }

  currentSlide: number = 1
  dotHelper: Array<Number> = []
  slider: KeenSliderInstance = null

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        slideChanged: (s) => {
          this.currentSlide = s.track.details.rel
        }, loop: true,
      })
      this.dotHelper = [
        ...Array(this.slider.track.details.slides.length).keys(),
      ]
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}

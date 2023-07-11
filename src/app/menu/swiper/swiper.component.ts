import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewChild} from '@angular/core';
import {ChatBot} from "../../shared/models/chat-bot.model";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import Swiper from "swiper";
import {A11y, Navigation, Pagination, Scrollbar, Virtual} from "swiper/modules";


@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NgForOf,
    RouterLink,
    NgIf
  ],
  standalone: true
})
export class SwiperComponent implements AfterViewInit {
  @ViewChild('swiper') swiper: HTMLElement | undefined;
  @Input() chatBots: ChatBot[];
  public instance_swiper;

  ngAfterViewInit(): void {
    this.instance_swiper = new Swiper(this.swiper,{
      allowTouchMove: false,
      modules: [Navigation, Pagination, Scrollbar, A11y, Virtual],
      on: {
        slideChange: function () {
          const index_currentSlide = this.realIndex;
          console.log('slideChange', index_currentSlide);
        },
      },
    });
  }
}

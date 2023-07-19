import {Component, ElementRef, ViewChild} from '@angular/core';
import {TextToSpeechService} from "../shared/services/text-to-speech.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent{
  @ViewChild("carousel") carousel: ElementRef<HTMLElement>;

  constructor(public textToSpeechService: TextToSpeechService) {
  }
}

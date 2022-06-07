import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {
  public synth = window.speechSynthesis;
  constructor() {}

  speak(text: string) {
    if (text !== '') {
      const utterThis = new SpeechSynthesisUtterance(text);
      utterThis.pitch = 0.8;
      utterThis.rate = 0.8;
      utterThis.lang = "de-ger"
      this.synth.speak(utterThis);
    }
  }
}

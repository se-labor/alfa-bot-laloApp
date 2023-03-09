import {Injectable} from '@angular/core';
import {SettingService} from "./setting.service";

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  public synth = window.speechSynthesis; // Get the speechSynthesis object
  public utterThis = new SpeechSynthesisUtterance(""); // Create a new utterance object

  constructor(public settingService: SettingService) {
    this.utterThis.rate = this.settingService.playbackSpeed;
    this.utterThis.lang = 'de-DE';
    this.settingService.playbackSpeedChanged.subscribe((value: number) => {
      this.utterThis.rate = value;
    });
  }

  // Start speaking the text, if the speechSynthesis is not already speaking, else stop it
  async toggleSpeaking(text: string) {
      if (this.synth.speaking){
        this.synth.cancel();
      } else {
        this.speak(text)
      }
  }

  filterText(text: string) {
    let filteredText: string = text;
    // Matches valid links, which are surrounded by brackets. Also includes matching of special german characters.
    const rExp: RegExp = new RegExp("\\(https?:\\/\\/(www\\.)?[\u00F0-\u02AF-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z\\d()]{1,6}\\b([\u00F0-\u02AF-a-zA-Z\\d!@:%_+.~#?&\\/=])+\\)");
    // Removes link occurrences from the text, till there are none left
    filteredText = filteredText.replace(rExp, "");
    // Remove other unwanted symbols
    const symbolsToReplace = ["[", "]", "*"];
    symbolsToReplace.forEach((symbolToReplace) => {
      filteredText =  filteredText.split(symbolToReplace).join("");
    });
    return filteredText;
  }


  speak(text: string) {
    const filteredText = this.filterText(text);
    if (filteredText !== '') {
      this.utterThis.text = filteredText; // Change the text of the utterance object to avoid creating a new one
      this.synth.speak(this.utterThis);
    }
  }
}

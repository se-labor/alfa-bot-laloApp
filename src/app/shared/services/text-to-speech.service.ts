import {Injectable} from '@angular/core';
import {SettingService} from "./setting.service";
import {TextToSpeech, TTSOptions} from "@capacitor-community/text-to-speech";

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  public utterThis: TTSOptions;
  public speaking = false;

  constructor(public settingService: SettingService) {
    this.utterThis = {
      text: '',
      lang: 'de-DE',
      rate: this.settingService.playbackSpeed,
      pitch: 1.0,
      volume: 1.0,
      category: 'ambient',
    };
    this.settingService.playbackSpeedChanged.subscribe((value: number) => {
      this.utterThis.rate = value;
    });
    console.log(TextToSpeech.getSupportedLanguages())
  }

  // Start speaking the text, if the speechSynthesis is not already speaking, else stop it
  async toggleSpeaking(text: string) {
    if (this.speaking) {
      await TextToSpeech.stop();
      this.speaking = false;
    } else {
      this.speaking = true;
      await this.speak(text);
      this.speaking = false;
    }
  }

  filterText(text: string) {
    let filteredText: string = text;
    // Matches valid links, which are surrounded by brackets. Also includes matching of special german characters.
    const linkRExp = new RegExp("\\(https?:\\/\\/(www\\.)?[\u00F0-\u02AF-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z\\d()]{1,6}\\b([\u00F0-\u02AF-a-zA-Z\\d!@:%_+.~#?&\\/=])+\\)");
    // Removes link occurrences from the text, till there are none left
    filteredText = filteredText.replace(linkRExp, "");
    const telRExp = new RegExp("\\(tel:\\+?[0-9]{1,}\\)");
    // Removes tel occurrences from the text, till there are none left
    filteredText = filteredText.replace(telRExp, "");
    // Remove other unwanted symbols
    const symbolsToReplace = ["[", "]", "*"];
    symbolsToReplace.forEach((symbolToReplace) => {
      filteredText = filteredText.split(symbolToReplace).join("");
    });
    console.log(filteredText);
    return filteredText;
  }


  async speak(text: string) {
    const filteredText = this.filterText(text);
    if (filteredText !== '') {
      this.utterThis.text = filteredText; // Change the text of the utterance object to avoid creating a new one
      try {
        await TextToSpeech.speak(this.utterThis)
      } catch (ignored) { // Ignore error, because it is thrown when the user stops the speech
      }
    }
  }
}

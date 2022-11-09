import {Injectable} from '@angular/core';
import {SettingService} from "./setting.service";
import { TextToSpeech, TTSOptions } from "@capacitor-community/text-to-speech";

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {
  public speaking: boolean;
  public synth = window.speechSynthesis;
  public pitch: number = 0.8;  // Set the pitch of the speech;
  public playBackSpeed: number = this.settingService.playbackSpeed; // Set the speed of the speech;
  constructor(public settingService: SettingService) {
    this.settingService.playbackSpeedChanged.subscribe((value: number) => {
      this.playBackSpeed = value;
    });
  }

  // Start speaking the text, if the speechSynthesis is not already speaking, else stop it
  async toggleSpeaking(text: string) {
    if (this.speaking){
      this.speaking = false;
      await TextToSpeech.stop();
    } else {
      await this.speak(text)
    }
  }

  async speak(text: string) {
    this.speaking = true;
    // Declare variable for filtering text
    let filteredText: string = text;
    // Matches valid links, which are surrounded by brackets. Also includes matching of special german characters.
    const rExp: RegExp = new RegExp("\\(https?:\\/\\/(www\\.)?[\u00F0-\u02AF-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z\\d()]{1,6}\\b([\u00F0-\u02AF-a-zA-Z\\d!@:%_+.~#?&\\/=])+\\)");
    // Removes link occurrences from the text, till there are none left
    while (rExp.test(filteredText)) {
      filteredText = filteredText.replace(rExp, "");
    }
    // Remove other unwanted symbols
    const symbolsToReplace = ["[", "]", "*"];
    symbolsToReplace.forEach((symbolToReplace) => {
      filteredText =  filteredText.split(symbolToReplace).join("");
    });
    // Utter filteredText, if there is text left
    if (filteredText !== '') {
      const options: TTSOptions = {
        text: filteredText,
        lang: 'de',
        rate: this.playBackSpeed,
        pitch: this.pitch,
        volume: 1.0,
        category: 'ambient'
      };
      try {
        await TextToSpeech.speak(options);
        this.speaking = false;
      } catch (e) {
        console.log(e);
      }
    }
  }
}

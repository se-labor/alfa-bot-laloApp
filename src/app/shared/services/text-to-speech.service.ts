import {Injectable} from '@angular/core';
import {SettingService} from "./setting.service";

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {
  public synth = window.speechSynthesis;
  public pitch: number = 0.8;  // Set the pitch of the speech;
  public playBackSpeed: number = this.settingService.playbackSpeed; // Set the speed of the speech;
  constructor(public settingService: SettingService) {
    this.settingService.playbackSpeedChanged.subscribe((value: number) => {
      this.playBackSpeed = value;
    });
  }

  // Start speaking the text, if the speechSynthesis is not already speaking, else stop it
  toggleSpeaking(text: string) {
    if (this.synth.speaking) {
      this.synth.cancel();
    } else {
      this.speak(text);
    }
  }

  speak(text: string) {
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
      const utterThis = new SpeechSynthesisUtterance(filteredText);
      utterThis.pitch = this.pitch;
      utterThis.rate = this.playBackSpeed;
      utterThis.lang = "de-ger";
      this.synth.speak(utterThis);
    }
  }
}

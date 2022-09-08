import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {
  public synth = window.speechSynthesis;
  constructor() {}

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
      utterThis.pitch = 0.8;
      utterThis.rate = 0.8;
      utterThis.lang = "de-ger";
      this.synth.speak(utterThis);
    }
  }
}

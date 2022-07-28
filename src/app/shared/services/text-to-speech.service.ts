import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {
  public synth = window.speechSynthesis;
  constructor() {}

  speak(text: string) {
    // Declare variable for filtering text
    let filteredText: string = text;
    // Remove Links from filteredText
    const rExp: RegExp = new RegExp("\\(https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z\\d()]{1,6}\\b([-a-zA-Z\\d!@:%_\\+.~#?&\\/\\/=])+\\)");
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

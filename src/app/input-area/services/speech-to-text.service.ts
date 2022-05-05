import {Injectable} from '@angular/core';

declare var webkitSpeechRecognition: any;


@Injectable({
  providedIn: 'root'
})
export class SpeechToTextService {

  private recognition =  new webkitSpeechRecognition();
  private isStoppedSpeechRecog = false;
  private tempWords;
  public text = '';


  constructor() { }

  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'ger-DE';
    this.recognition.continuous = false;

    this.recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
    });
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    this.recognition.addEventListener('end', (condition) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    console.log(this.text)
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }
}

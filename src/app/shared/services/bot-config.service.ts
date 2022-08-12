import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BotConfigService {

  public chatBots: {id:string, name: string, imageUrl: string, apiUrl: string, apiKey: string}[] = window['env']['BOT_CONFIG'];

  constructor() {

  }



}

import {BotButton} from "../../modules/api";

export class Message {
  identifier: string;
  text: string;
  payload: string;
  imageUrl: string;
  buttons: Array<BotButton>

  // Don't use this constructor, use the apiConverterService instead
  constructor(identifier: string, text: string = '', payload: string = '', imageUrl: string = '', buttons: Array<BotButton> = []) {
    this.identifier = identifier;
    this.text = text;
    this.payload = payload;
    this.imageUrl = imageUrl;
    this.buttons = buttons;
  }

}

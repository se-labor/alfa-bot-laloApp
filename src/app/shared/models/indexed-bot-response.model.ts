import {BotButton} from "../../modules/api";

export interface IndexedBotResponse {
  index: number;
  message: string;
  imageUrl: string;
  buttons: Array<BotButton>;
}

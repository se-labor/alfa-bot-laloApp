export class ChatBot {
  id: string;
  name: string;
  imageUrl: string;
  apiUrl: string;
  apiKey: string;

  constructor(id: string, name: string, imageUrl: string, apiUrl: string, apiKey: string) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }
}

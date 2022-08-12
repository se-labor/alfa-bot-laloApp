import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menue',
  templateUrl: './menue.component.html',
  styleUrls: ['./menue.component.scss']
})
export class MenueComponent implements OnInit {
  public chatBots: { name: string, url: string, imageUrl: string}[] = [
    { name: 'Lalo', url: 'https://alfabot.se-labor.de/alfabotapi', imageUrl: 'http://localhost:4200/favicon.ico' }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}

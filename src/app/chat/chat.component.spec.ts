import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatComponent} from './chat.component';
import {ActivatedRoute} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {TextAreaComponent} from "./text-area/text-area.component";
import {InputAreaComponent} from "./input-area/input-area.component";
import {HeaderComponent} from "../shared/header/header.component";
import {MaterialModule} from "../modules/material/material.module";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BotConfigService} from "../shared/services/bot-config.service";

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatComponent, TextAreaComponent, HeaderComponent, InputAreaComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: BotConfigService, useValue: {
            chatBots: [
              {
                id: 'testBot',
                name: 'test',
                imageUrl: 'https://picsum.photos/200/300',
                apiUrl: 'https://alfabot.se-labor.de/alfabotapi',
                apiKey: '92d13306-b96e-11eb-b8e0-0242ac120002'
              }
            ]
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                event: 'surveyCompleted'
              },
              routeConfig: {
                path: 'chat/'
              },
              url: [{path: 'chat/'}, {path: 'testBot'}]
            }
          }
        },

      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;

    spyOn(component.messageService, 'getResponsesFor')
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a response if the "event" queryParams value equals "surveyCompleted"', () => {
    expect(component.messageService.getResponsesFor).toHaveBeenCalledWith('surveyCompleted');
  });
});

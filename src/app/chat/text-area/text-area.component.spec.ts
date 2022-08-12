import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TextAreaComponent} from './text-area.component';
import {MessageService} from "../message.service";
import {ImageService} from "./services/image.service";
import {MarkdownModule} from "ngx-markdown";
import {MatIconModule} from "@angular/material/icon";
import {BotResponseComponent} from "./bot-response/bot-response.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";


describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;
  let mockMessageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextAreaComponent, BotResponseComponent],
      providers: [MessageService, ImageService,],
      imports: [
        MatIconModule,
        HttpClientTestingModule,
        MarkdownModule.forRoot()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;

    mockMessageService = TestBed.inject(MessageService);
    spyOn(mockMessageService, 'getMessages').and.returnValue([{
      'message': 'testText',
      'imageUrl': '',
      'buttons': []
    }, {
      'message': 'testText2',
      'imageUrl': '',
      'buttons': [{title: 'testButton', payload: 'testButton'}]
    }]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly determine the message type', () => {
    expect(component.determineMessageType({
      'message': '',
      'imageUrl': '',
      'buttons': [{'payload': 'TestButtonPayload', 'title': 'TestButtonTitle'}]
    })).toBe('bot');
    expect(component.determineMessageType({
      'identifier': '',
      'content': ''
    })).toBe('user');
  });

  it('should call "scrollToBottom()" after view is checked', () => {
    spyOn(component, 'scrollToBottom').and.callThrough();
    fixture.detectChanges();
    expect(component.scrollToBottom).toHaveBeenCalled();
  });

  it('should have a list containing the initial message(s)', () => {
    expect(component.messages).toBeTruthy();
    expect(component.messages.length).toBe(2);
  });

  it('should replace message list with emitted lists', () => {
    mockMessageService.listChanged
      .next([{'identifier': '00000000-0000-0000-0000-000000000000', 'content': 'TestUserMessage'}]);
    expect(component.messages[0])
      .toEqual({'identifier': '00000000-0000-0000-0000-000000000000', 'content': 'TestUserMessage'});
  });
});

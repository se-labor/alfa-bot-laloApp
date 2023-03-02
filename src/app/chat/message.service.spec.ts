import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {MessageService} from './message.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BotResponse, BotService, UserMessage} from "../modules/api";
import {Observable, Observer} from "rxjs";


describe('MessageService', () => {
  let service: MessageService;
  let mockBotService: BotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: BotService, use: mockBotService}]
    });
    service = TestBed.inject(MessageService);

    mockBotService = TestBed.inject(BotService);
    const responseObserver = function (observer: Observer<BotResponse[]>) {
      observer.next([{
        'message': '',
        'imageUrl': '',
        'buttons': [{'payload': 'TestButtonPayload', 'title': 'TestButtonTitle'}]}]);
      observer.complete();
    };
    const responseObservable = new Observable(responseObserver);
    spyOn(mockBotService,'sendUserMessage').and.callFake(
      function (
        userMessage: UserMessage,
        observe?: any,
        reportProgress?: any,
        options?: any): Observable<any> {
          return responseObservable;
      }
    );

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add user message send to the message list', () => {
    service.sendMessage({
      identifier: '00000000-0000-0000-0000-000000000000',
      text: 'testMessage',
      payload: 'testPayload',
      imageUrl:'',
      buttons: [] });
    expect(service.getMessages()).toContain(
      {
        identifier: '00000000-0000-0000-0000-000000000000',
        text: 'testMessage',
        payload: 'testPayload',
        imageUrl:'',
        buttons: [] });
  });

  it('should add the bot responses to the message list', fakeAsync(() => {
    service.sendMessage({
      identifier: '00000000-0000-0000-0000-000000000000',
      text: 'testMessage',
      payload: 'testPayload',
      imageUrl:'',
      buttons: [] });
    tick(300);
    expect(service.getMessages().length).toBeGreaterThanOrEqual(2);
  }));
});

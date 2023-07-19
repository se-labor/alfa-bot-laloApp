import {TestBed} from '@angular/core/testing';

import {ApiConverterService} from './api-converter.service';
import {UserService} from "./user.service";

describe('ApiDataConverterService', () => {
  let service: ApiConverterService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConverterService);
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a message when "botResponseToMessage()" is called', () => {
    const message = service.botResponseToMessage({
      message: 'testText',
      imageUrl: 'https://testimageurl.de/testsubpage',
      buttons: [{title: 'testButton', payload: 'testPayload'}]
    });
    expect(message).toBeTruthy();
    expect(message.identifier).toEqual(userService.getUUID());
    expect(message.text).toEqual('testText');
    expect(message.payload).toEqual('');
    expect(message.imageUrl).toEqual('https://testimageurl.de/testsubpage');
    expect(message.buttons).toEqual([{title: 'testButton', payload: 'testPayload'}]);

  });

  it('should correctly set payload if no payload is given', () => {
    expect(service.getUserMessageFrom('testText').payload).toEqual('testText');
  });
});

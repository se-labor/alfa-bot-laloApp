import {TestBed} from '@angular/core/testing';

import {MessageService} from './message.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MessageService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add user message send to the message list', () => {
    service.sendMessage({identifier: '00000000-0000-0000-0000-000000000000', content: 'testMessage'});
    expect(service.getMessages()).toContain(
      {identifier: '00000000-0000-0000-0000-000000000000', content: 'testMessage'});
  });
});

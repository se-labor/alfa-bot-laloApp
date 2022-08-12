import { TestBed } from '@angular/core/testing';

import { BotConfigService } from './bot-config.service';

describe('BotConfigService', () => {
  let service: BotConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

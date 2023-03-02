import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { SettingService } from './setting.service';

describe('SettingService', () => {
  let service: SettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should react to playback speed change', fakeAsync(() => {
    service.playbackSpeed = 1; // Set to one to make sure the test is not false positive
    service.playbackSpeedChanged.next(1.5);
    tick(1000); // Wait for the playback speed to change TODO: Find a better way to do this
    expect(service.playbackSpeed).toBe(1.5);
  }));

  xit('should react to font size change', fakeAsync(() => {
    service.fontSize = 1; // Set to one to make sure the test is not false positive
    service.fontSizeChanged.next(16);
    tick(1000); // Wait for the playback speed to change TODO: Find a better way to do this
    expect(service.fontSize).toBe(16);
  }));

  xit('should set the document body font size to the set font size', fakeAsync( () => {
    document.body.style.fontSize = '1px';
    service.fontSize = 1; // Set to one to make sure the test is not false positive
    service.fontSizeChanged.next(16);
    tick(1000); // Wait for the playback speed to change TODO: Find a better way to do this
    expect(document.body.style.fontSize).toBe('16px');
  }));
});

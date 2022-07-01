import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the created UUID when "getUUID()" is called', () => {
    expect(service.getUUID()).toBeTruthy();
  });
});

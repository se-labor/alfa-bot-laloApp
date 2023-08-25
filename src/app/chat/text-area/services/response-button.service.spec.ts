import {TestBed} from '@angular/core/testing';

import {ResponseButtonService} from './response-button.service';

describe('ResponseButtonService', () => {
  let service: ResponseButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit disableButtons event when disableButtons() method is called', () => {
    spyOn(service.disableResponseButtons, 'emit');
    service.disableButtons();
    expect(service.disableResponseButtons.emit).toHaveBeenCalled();
  });
});

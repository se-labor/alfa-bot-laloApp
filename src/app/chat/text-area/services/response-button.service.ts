import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponseButtonService {
  @Output() public disableResponseButtons = new EventEmitter<void>();

  public disableButtons() {
    this.disableResponseButtons.emit();
  }
}

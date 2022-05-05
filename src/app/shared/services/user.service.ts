import {Injectable} from '@angular/core';
import {v4 as uuidv4} from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private UUID = uuidv4();
  constructor() {

  }

  getUUID() {
    return this.UUID;
  }
}

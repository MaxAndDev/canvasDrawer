import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionHandlerService {

  deleteState: BehaviorSubject<Boolean>;
  saveState: BehaviorSubject<Boolean>;

  constructor() {

    this.deleteState = new BehaviorSubject(false);

    this.saveState = new BehaviorSubject(false);

  }
}

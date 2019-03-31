import { Component } from '@angular/core';
import { ActionHandlerService } from './service/action-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'canvasDrawer';

  constructor(private actionHanler: ActionHandlerService) {}


  save(){

    this.actionHanler.saveState.next(true);
  
  }

  delete(){

    this.actionHanler.deleteState.next(true);

  }

}

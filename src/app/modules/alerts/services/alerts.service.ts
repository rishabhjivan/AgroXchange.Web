import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { SetAlertMsg } from '../actions/alerts';
import { Alert } from '../store/alerts';

@Injectable()
export class AlertsService {

  public static returned: BehaviorSubject<any> = new BehaviorSubject({
    msg: '',
    type: ''
  });
  constructor(private store: Store<any>) {
    store.select(state => state.alerts).subscribe(state => {
      AlertsService.returned.next(state);
    });
  }

  getAlert() {
    return AlertsService.returned;
  }

  dispatchAction(obj: Alert) {
    if (obj.type == 'error' && !obj.msg) {
      obj.msg = "An unexpected error has occurred<br />Please try again.<br />If you're still experiencing problems, please contact us at:<br /><a href='mailto:support@agroxchange.ng'>support@agroxchange.ng</a>";
    }
    this.store.dispatch(new SetAlertMsg(obj));
  }

  dispatchError(msg?: string, err?: any) {
    this.dispatchAction({
      msg: msg,
      type: 'error',
      err: err
    });
  }

}

import { Action } from '@ngrx/store';
import { Alert } from '../store/alerts';

export const SET_ALERT_MSG = 'SET_ALERT_MSG';

export class SetAlertMsg implements Action {
  readonly type = SET_ALERT_MSG;
  constructor(public payload: Alert) {}
}

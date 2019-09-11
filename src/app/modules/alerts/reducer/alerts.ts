import { SET_ALERT_MSG } from '../actions/alerts';
import { Alert } from '../store/alerts';

const initialState = {
  msg: '',
  type: ''
};

export function alertsReducer(
  state: Alert = initialState,
  action
): Alert {
  switch (action.type) {
    case SET_ALERT_MSG:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

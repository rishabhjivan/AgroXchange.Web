export interface Alert {
  msg: string;
  type: string;
  err?: any;
  actions?: Array<any>;
}

import { Action } from '@ngrx/store';
import { MapTools } from '../stores/map-tools';

export const SET_QUERY_TOOL = 'SET_QUERY_TOOL';
export const SET_BUFFER_TOOL = 'SET_BUFFER_TOOL';
export const SET_LAYER_TOOL = 'SET_LAYER_TOOL';
export const SET_DRAW_TOOL = 'SET_DRAW_TOOL';
export const SET_MEASURE_TOOL = 'SET_MEASURE_TOOL';
export const SET_WEATHER_TOOL = 'SET_WEATHER_TOOL';

export class SetMapTool implements Action {
  public type = '';
  constructor(public payload: boolean, type: string) {
    this.type = type;
  }
}

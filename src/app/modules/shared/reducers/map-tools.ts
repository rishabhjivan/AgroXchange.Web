import { SET_BUFFER_TOOL, SET_DRAW_TOOL, SET_LAYER_TOOL, SET_MEASURE_TOOL, SET_QUERY_TOOL, SET_WEATHER_TOOL } from '../actions/map-tools';
import { MapTools } from '../stores/map-tools';

const initialState = {
  queryTool: false,
  bufferTool: false,
  layerSelect: false,
  drawToSelect: false,
  measuringTool: false,
  weatherTool: false
};

export function mapToolsReducer(
  state: MapTools = initialState,
  action
): MapTools {
  switch (action.type) {
    case SET_QUERY_TOOL:
      return Object.assign({}, state, { queryTool: action.payload });
    case SET_BUFFER_TOOL:
      if (action.payload)
        return Object.assign({}, state, { bufferTool: action.payload, drawToSelect: false });
      else
        return Object.assign({}, state, { bufferTool: action.payload });
    case SET_LAYER_TOOL:
      return Object.assign({}, state, { layerSelect: action.payload });
    case SET_DRAW_TOOL:
      if (action.payload)
        return Object.assign({}, state, { drawToSelect: action.payload, bufferTool: false });
      else  
        return Object.assign({}, state, { drawToSelect: action.payload });
    case SET_MEASURE_TOOL:
      return Object.assign({}, state, { measuringTool: action.payload });
    case SET_WEATHER_TOOL:
      return Object.assign({}, state, { weatherTool: action.payload });
    default:
      return state;
  }
}

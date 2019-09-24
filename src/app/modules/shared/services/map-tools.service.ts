import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { SetMapTool } from '../actions/map-tools';
import { MapTools } from '../stores/map-tools';

@Injectable({
  providedIn: 'root'
})
export class MapToolsService {

  public static returned: BehaviorSubject<any> = new BehaviorSubject({
    queryTool: false,
    bufferTool: false,
    layerSelect: false,
    drawToSelect: false,
    measuringTool: false,
    weatherTool: false
  });

  constructor(private store: Store<any>) {
    store.select(state => state.mapTools).subscribe(state => {
      MapToolsService.returned.next(state);
    });
  }

  getMapTools() {
    return MapToolsService.returned;
  }

  dispatchAction(type: string, selected: boolean) {
    this.store.dispatch(new SetMapTool(selected, type));
  }

}

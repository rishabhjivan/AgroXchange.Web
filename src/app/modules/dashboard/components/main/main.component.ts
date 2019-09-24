import { Component, OnInit } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { MapToolsService } from 'src/app/modules/shared/services/map-tools.service';
import { MapTools } from 'src/app/modules/shared/stores/map-tools';
import { FarmsService } from '../../services/farms.service';
import { Farm } from 'src/app/modules/shared/models/api/farm';
import { MapMarker } from 'src/app/modules/shared/models/view/map-marker';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private mapTools$;
  public mapToolState: MapTools;
  //https://angular-maps.com/guides/getting-started/
  public initialZoom: number = 10;
  public mapMarkers: MapMarker[];
  public farms: Farm[];
  public ondoMarker: MapMarker = {
    latitude: 7.0983926284126655,
    longitude: 4.835423576874064,
    draggable: false,
    label: 'Ondo'
  };

  constructor(private farmsService: FarmsService, private store: Store<any>, private mapToolsService: MapToolsService) {
    this.mapTools$ = mapToolsService.getMapTools();
    this.mapTools$ = this.mapTools$.subscribe(state => {
      this.mapToolState = state;
    });
  }

  ngOnInit() {
    this.mapMarkers = [];
    this.farmsService.getFarms()
      .subscribe(farms => {
        this.farms = farms;
      });
  }

  mapClicked($event: any) {
    this.mapMarkers.push({
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      draggable: true,
      label: ''
    });
    console.log({
      latitude: $event.coords.lat,
      longitude: $event.coords.lng
    });
  }

  mapMarkerClicked(mapMarker: MapMarker, index: number) {

  }

  mapMarkerDragEnd(mapMarker: MapMarker, $event: any) {

  }

}

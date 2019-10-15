import { Component, OnInit } from '@angular/core';
import { Store, State } from '@ngrx/store';
import * as _ from 'lodash';
import { MapToolsService } from 'src/app/modules/shared/services/map-tools.service';
import { MapTools } from 'src/app/modules/shared/stores/map-tools';
import { FarmsService } from '../../services/farms.service';
import { Farm } from 'src/app/modules/shared/models/api/farm';
import { MapMarker } from 'src/app/modules/shared/models/view/map-marker';
import { FilterBuffer } from 'src/app/modules/shared/models/view/filter-buffer';

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
  public mapType: string = 'roadmap'; //"roadmap" | "hybrid" | "satellite" | "terrain"
  private mapBounds: any;
  public mapMarkers: MapMarker[];
  public bufferMarkers: MapMarker[];
  public farms: Farm[];
  public farmIds: string[];
  public ondoMarker: MapMarker = {
    latitude: 7.0983926284126655,
    longitude: 4.835423576874064,
    draggable: false,
    label: 'Ondo'
  };
  public mapBuffer: FilterBuffer = {
    latitude: 7.0983926284126655,
    longitude: 4.835423576874064,
    radius: 10000
  };

  constructor(private farmsService: FarmsService, private store: Store<any>, private mapToolsService: MapToolsService) {
    this.mapTools$ = mapToolsService.getMapTools();
    this.mapTools$ = this.mapTools$.subscribe(state => {
      this.mapToolState = state;
      if (state.bufferTool) this.filterByBuffer();
    });
  }

  ngOnInit() {
    this.mapMarkers = [];
    this.bufferMarkers = [];
    this.farms = [];
    this.farmIds = [];
  }

  mapClicked($event: any) {
    /*this.mapMarkers.push({
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      draggable: true,
      label: ''
    });*/
    console.log({
      latitude: $event.coords.lat,
      longitude: $event.coords.lng
    });
  }

  boundsChanged($event: any) {
    this.mapBounds = $event;
    this.farmsService.getFarms({
      t: 'rect',
      lt1: this.mapBounds.getSouthWest().lat(),
      lt2: this.mapBounds.getNorthEast().lat(),
      ln1: this.mapBounds.getSouthWest().lng(),
      ln2: this.mapBounds.getNorthEast().lng()
    })
      .subscribe(farms => {
        _.each(farms, (farm) => {
          if (this.farmIds.indexOf(farm.farmId) < 0) {
            this.farmIds.push(farm.farmId);
            this.farms.push(farm);
            this.mapMarkers.push({
              latitude: farm.latitude,
              longitude: farm.longitude,
              draggable: false,
              label: ''
            });
          }
        });
      });
  }

  mapMarkerClicked(mapMarker: MapMarker, index: number) {

  }

  mapMarkerDragEnd(mapMarker: MapMarker, $event: any) {

  }

  bufferCenterChanged($event: any) {
    this.mapBuffer.latitude = $event.lat;
    this.mapBuffer.longitude = $event.lng;
    this.filterByBuffer();
  }

  bufferRadiusChanged($event: any) {
    this.mapBuffer.radius = $event;
    this.filterByBuffer();
  }

  filterByBuffer() {
    let radKm = this.mapBuffer.radius / 1000;
    this.farmsService.getFarms({
      t: 'circle',
      lt1: this.mapBuffer.latitude,
      ln1: this.mapBuffer.longitude,
      rd1: radKm
    })
      .subscribe(farms => {
        this.bufferMarkers = [];
        _.each(farms, (farm) => {
          if (this.farmIds.indexOf(farm.farmId) < 0) {
            this.farmIds.push(farm.farmId);
            this.farms.push(farm);
          }
          this.bufferMarkers.push({
            latitude: farm.latitude,
            longitude: farm.longitude,
            draggable: false,
            label: ''
          });
        });
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { Store, State } from '@ngrx/store';
import * as _ from 'lodash';
import { MapToolsService } from 'src/app/modules/shared/services/map-tools.service';
import { MapTools } from 'src/app/modules/shared/stores/map-tools';
import { FarmsService } from '../../services/farms.service';
import { Farm } from 'src/app/modules/shared/models/api/farm';
import { MapMarker } from 'src/app/modules/shared/models/view/map-marker';
import { FilterBuffer } from 'src/app/modules/shared/models/view/filter-buffer';
import { FilterRect } from 'src/app/modules/shared/models/view/filter-rect';

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
  public filteredMarkers: MapMarker[];
  public farms: Farm[];
  public farmIds: string[];
  public ondoMarker: MapMarker = {
    latitude: 7.0983926284126655,
    longitude: 4.835423576874064,
    draggable: false,
    label: 'Ondo'
  };
  public mapBuffer: FilterBuffer = new FilterBuffer();
  public mapRectangle: FilterRect = new FilterRect();

  constructor(private farmsService: FarmsService, private store: Store<any>, private mapToolsService: MapToolsService) {
    this.mapTools$ = mapToolsService.getMapTools();
    this.mapTools$ = this.mapTools$.subscribe(state => {
      if (this.mapToolState && (this.mapToolState.bufferTool != state.bufferTool ||
        this.mapToolState.drawToSelect != state.drawToSelect)) {
        this.filteredMarkers = [];
      }
      this.mapToolState = state;
      if (state.bufferTool && this.mapBuffer.drawn) this.filterByBuffer();
      if (state.drawToSelect && this.mapRectangle.nwDrawn && this.mapRectangle.seDrawn) this.filterByRect();
    });
  }

  ngOnInit() {
    this.mapMarkers = [];
    this.filteredMarkers = [];
    this.farms = [];
    this.farmIds = [];
  }

  mapClicked($event: any) {
    if (this.mapToolState.bufferTool && !this.mapBuffer.drawn) {
      this.mapBuffer.radius = 10000;
      this.mapBuffer.latitude = $event.coords.lat;
      this.mapBuffer.longitude = $event.coords.lng;
      this.mapBuffer.drawn = true;
      this.filterByBuffer();
    } else if (this.mapToolState.drawToSelect) {
      if (!this.mapRectangle.nwDrawn) {
        this.mapRectangle.north = $event.coords.lat;
        this.mapRectangle.west = $event.coords.lng;
        this.mapRectangle.south = $event.coords.lat;
        this.mapRectangle.east = $event.coords.lng;
        this.mapRectangle.nwDrawn = true;
      } else if (!this.mapRectangle.seDrawn) {
        this.mapRectangle.south = $event.coords.lat;
        this.mapRectangle.east = $event.coords.lng;
        this.mapRectangle.seDrawn = true;
      }
    }
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

  pushFarmsToFilter(farms) {
    this.filteredMarkers = [];
    _.each(farms, (farm) => {
      if (this.farmIds.indexOf(farm.farmId) < 0) {
        this.farmIds.push(farm.farmId);
        this.farms.push(farm);
      }
      this.filteredMarkers.push({
        latitude: farm.latitude,
        longitude: farm.longitude,
        draggable: false,
        label: ''
      });
    });
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
        this.pushFarmsToFilter(farms);
      });
  }

  rectBoundsChanged($event: any) {
    console.log($event);
    this.mapRectangle.north = $event.north;
    this.mapRectangle.west = $event.west;
    this.mapRectangle.south = $event.south;
    this.mapRectangle.east = $event.east;
    this.filterByRect();
  }

  filterByRect() {
    this.farmsService.getFarms({
      t: 'rect',
      lt1: this.mapRectangle.south,
      lt2: this.mapRectangle.north,
      ln1: this.mapRectangle.west,
      ln2: this.mapRectangle.east
    })
      .subscribe(farms => {
        this.pushFarmsToFilter(farms);
      });
  }

}

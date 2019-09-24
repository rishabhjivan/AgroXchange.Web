import { Component, OnInit } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { MapToolsService } from '../../services/map-tools.service';
import { MapTools } from '../../stores/map-tools';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private mapTools$;
  public mapToolState: MapTools;

  constructor(private store: Store<any>, private mapToolsService: MapToolsService) {
    this.mapTools$ = mapToolsService.getMapTools();
    this.mapTools$ = this.mapTools$.subscribe(state => {
      this.mapToolState = state;
    });
  }

  ngOnInit() {
  }

  selectTool(mapToolType: string, selected: boolean) {
    this.mapToolsService.dispatchAction(mapToolType, selected);
  }

}

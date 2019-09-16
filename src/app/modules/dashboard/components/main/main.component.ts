import { Component, OnInit } from '@angular/core';
import { FarmsService } from '../../services/farms.service';
import { Farm } from 'src/app/modules/shared/models/api/farm';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public farms: Farm[];

  constructor(private farmsService: FarmsService) { }

  ngOnInit() {
    this.farmsService.getFarms()
      .subscribe(farms => {
        this.farms = farms;
      });
  }

}

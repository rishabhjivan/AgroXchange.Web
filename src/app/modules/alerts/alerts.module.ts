import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { alertsReducer } from './reducer/alerts';
import { AlertsService } from './services/alerts.service';
import { AlertsComponent } from './components/alerts/alerts.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    StoreModule.forFeature('alerts', alertsReducer),
    SharedModule
  ],
  declarations: [AlertsComponent],
  providers: [AlertsService],
  exports: [AlertsComponent]
})
export class AlertsModule { }

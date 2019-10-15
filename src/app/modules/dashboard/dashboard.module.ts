import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MainComponent } from './components/main/main.component';
import { environment } from 'src/environments/environment';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: environment.Google_Maps_Key
    }),
    SharedModule
  ]
})
export class DashboardModule { }

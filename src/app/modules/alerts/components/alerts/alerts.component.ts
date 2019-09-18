import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Alert } from '../../store/alerts';
import { AlertsService } from '../../services/alerts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  message$;
  showAlert = false;
  alertMessage: any;
  alert?: Array<any>;
  typeLabels: any = {
    'error': "Error",
    'success': "Success"
  };
  @ViewChild('alertsModal', {static: true}) alertsModalDom: ElementRef;
  constructor(
    private store: Store<any>,
    private modalService: NgbModal,
    private alertsService: AlertsService) {
    this.message$ = alertsService.getAlert();
    this.message$ = this.message$.subscribe(state => {
      if (state.err && state.err.status === 401) {
        //Unauthorized. Do Nothing.
      } else {
        this.alertMessage = state;
        if (state && state.msg !== '') {
          this.flashAlert();
        }
      }
    });
  }

  flashAlert() {
    this.modalService.open(this.alertsModalDom, {windowClass: 'alerts-modal', backdropClass: 'alerts-modal-backdrop'});
  }

  ngOnInit() {
  }

}

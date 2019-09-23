import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertsService } from 'src/app/modules/alerts/services/alerts.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private alertsService: AlertsService) { }

  ngOnInit() {
    var email, key: string;
    this.route.queryParams.subscribe(params => {
      email = params.email;
      key = params.key;
      this.authService.activateUser(email, key)
        .then(
          user => {
            this.alertsService.dispatchAction({
              msg: 'Your account has been successfully activated. Please log in.',
              type: 'success'
            });
            this.router.navigate(['/auth/login']);
          },
          err => {
            this.alertsService.dispatchError(err);
          }
        );
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from './../../services/auth.service';
import { Login } from './../../../shared/models/view/login';
import { AlertsService } from '../../../alerts/services/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public model: Login = new Login;
  constructor(private authService: AuthService, private router: Router, private alertsService: AlertsService) { }

  ngOnInit() {
    if (this.authService.getUser()) {
      this.router.navigate(["dashboard"]);
    }
  }

  signIn() {
    this.authService.signIn(this.model)
      .then(
        user => {
          this.router.navigate(['/']);
        },
        err => {
          this.alertsService.dispatchError(err);
        }
      );
  }

}

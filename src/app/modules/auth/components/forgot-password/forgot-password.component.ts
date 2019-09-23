import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from './../../services/auth.service';
import { Login } from './../../../shared/models/view/login';
import { AlertsService } from '../../../alerts/services/alerts.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  
  public model: Login = new Login;

  constructor(private authService: AuthService, private router: Router, private alertsService: AlertsService) { }

  ngOnInit() {
  }

  submit(form) {
    if (!form.valid) {
      this.alertsService.dispatchError('Email id is required');
      return;
    }
    this.authService.forgotPassword(this.model.emailId)
      .then(
        user => {
          this.alertsService.dispatchAction({
            msg: 'If your email id is correct and your account exists, you will receive an email with instructions to reset your password.',
            type: 'success'
          });
        },
        err => {
          this.alertsService.dispatchError(err);
        }
      );
  }

}

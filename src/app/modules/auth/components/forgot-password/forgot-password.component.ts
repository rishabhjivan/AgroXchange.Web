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

  constructor() { }

  ngOnInit() {
  }

  submit() {
    
  }

}

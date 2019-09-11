import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';



@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, ResetPasswordComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    NgbModule
  ],
  providers: [
    AuthService,
    AuthGuardService
  ]
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: 'login',
      component: LoginComponent
    },{
      path: 'forgot',
      component: ForgotPasswordComponent
    },{
      path: 'reset',
      component: ResetPasswordComponent
    },{
      path: 'register',
      component: RegisterComponent
    }])
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

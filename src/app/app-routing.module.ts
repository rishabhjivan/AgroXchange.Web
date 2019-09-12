import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './modules/dashboard/components/main/main.component';
import { AuthGuardService as AuthGuard } from './modules/auth/services/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

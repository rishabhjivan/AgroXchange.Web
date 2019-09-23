import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/modules/shared/models/view/login';
import { AlertsService } from 'src/app/modules/alerts/services/alerts.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public confirmpassword: string;
  public password: string;
  private email: string;
  private key: string;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private alertsService: AlertsService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params.email;
      this.key = params.key;
    });
  }

  submit(form) {
    if (!form.valid || this.password != this.confirmpassword) {
      this.alertsService.dispatchError('All fields are required and both passwords should match');
      return;
    }
    this.authService.resetPassword(this.email, this.key, this.password)
      .then(
        user => {
          this.password = "";
          this.confirmpassword = "";
          this.alertsService.dispatchAction({
            msg: 'The new password has been successfully set. Please log in.',
            type: 'success'
          });
          this.router.navigate(['/auth/login']);
        },
        err => {
          this.alertsService.dispatchError(err);
        }
      );
  }

}

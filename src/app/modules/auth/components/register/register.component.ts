import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/modules/shared/models/view/register';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/modules/alerts/services/alerts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public user: Register;
  public roleList: any = [
    {role: 'Farmer', btnClass: 'btn-primary', sprite: 'farmer', label: "I'm a farmer"},
    {role: 'Aggregator', btnClass: 'btn-register-2', sprite: 'aggregator', label: "I'm an aggregator"},
    {role: 'Wholesaler', btnClass: 'btn-register-3', sprite: 'wholesaler', label: "I'm a wholesaler/retailer"},
    {role: 'Processor', btnClass: 'btn-register-4', sprite: 'processor', label: "I'm a processor"},
    {role: 'Offtaker', btnClass: 'btn-register-5', sprite: 'offtaker', label: "I'm an offtaker"},
    {role: 'Supplier', btnClass: 'btn-register-6', sprite: 'supplier', label: "I'm an input supplier"}
  ];
  public chosenRole: any;

  constructor(private authService: AuthService, private router: Router, private alertsService: AlertsService) { }

  ngOnInit() {
    this.user = new Register();
  }

  selectRole(roleObj) {
    this.user.role=roleObj.role;
    this.chosenRole = roleObj;
  }

  submit(form) {
    if (!form.valid) {
      this.alertsService.dispatchError('All fields are required');
      return;
    }
    this.authService.registerUser(this.user)
      .then(
        user => {
          this.alertsService.dispatchAction({
            msg: 'Thank you for registering with us. Please check your email to activate your account and login.',
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

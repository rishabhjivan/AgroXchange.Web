import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from './../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  public user;
  ngOnInit() {
    this.user = this.authService.getUser();
  }

  doSignout() {
    this.authService.signOut();
    this.router.navigate(['/auth/login']);
    return false;
  }

}

import { Component } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AgroXchange';
  today = new Date();

  constructor(private authService: AuthService) { }

  isSignedIn() {
    return this.authService.getUser();
  }
}

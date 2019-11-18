import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authGuard: AuthGuardService, private router: Router) { }
  mustLogIn: boolean

  ngOnInit() {
  }

  goToHome() {
    if(this.authGuard.authInfo.name && this.authGuard.authInfo.password) {
      this.authGuard.authInfo.authenticated = true;
      console.log(this.authGuard.authInfo)
      this.router.navigate(['/home']);
    } else {
      this.mustLogIn = true;
    }
  }

}

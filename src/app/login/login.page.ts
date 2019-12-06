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

  register(userData) {
    if(this.authGuard.authInfo.firstName && this.authGuard.authInfo.lastName && this.authGuard.authInfo.email && this.authGuard.authInfo.password) {
      this.authGuard.authInfo.authenticated = true;
      this.authGuard.register(userData)
      .subscribe(data => {
        this.authGuard.userInfo = data;
        console.log("User Authenticated Info",this.authGuard.userInfo);
        this.router.navigate(['/home']);
      });
    } else {
      this.mustLogIn = true;
    }
  }

}

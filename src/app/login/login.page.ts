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

  login(loginData) {
    if(this.authGuard.authInfo.email && this.authGuard.authInfo.password) {
      this.authGuard.authInfo.authenticated = true;
      this.authGuard.login(loginData)
      .subscribe(loginData => {
        this.authGuard.userInfo = loginData;
        console.log("User Login",this.authGuard.userInfo);
        this.authGuard.getUserInfo(loginData)
        .subscribe(userData => {
          this.authGuard.userInfo = userData;
          console.log("User Info", this.authGuard.userInfo);
        })
        this.router.navigate(['/home']);
      });
    } else {
      this.mustLogIn = true;
    }
  }

  loginHTTP(userData) {
    if(this.authGuard.authInfo.email && this.authGuard.authInfo.password) {
      this.authGuard.authInfo.authenticated = true;
      this.authGuard.loginAdvanced(userData)
      .then(data => {

        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

        //this.authGuard.userInfo = data;
        //console.log("User Authenticated Info",this.authGuard.userInfo);
        //this.router.navigate(['/home']);
      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
    
      });
    } else {
      this.mustLogIn = true;
    }
  }

}

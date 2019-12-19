import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public authGuard: AuthGuardService, 
    public router: Router,
    public storage: Storage) { }
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
        sessionStorage.setItem("userId", this.authGuard.userInfo.userId)
        sessionStorage.setItem("token", this.authGuard.userInfo.token)
        this.storage.set("userId", this.authGuard.userInfo.userId)
        this.storage.set("token", this.authGuard.userInfo.userId)
        this.authGuard.getUserInfo(loginData)
        .subscribe(userData => {
          this.authGuard.userInfo = userData;
          console.log("User Authenticated Info", this.authGuard.userInfo);
        })
        this.router.navigate(['/home']);
      });
    } else {
      this.mustLogIn = true;
    }
  }

  loginHTTP(userData) {
    console.log("1",userData)
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

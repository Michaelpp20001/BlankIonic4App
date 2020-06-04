import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public authGuard: AuthGuardService, 
    public router: Router,
    public storage: Storage,
    public platform: Platform
    ) {
      if(this.platform.is('mobileweb') || this.platform.is('desktop')) {
        this.buttonPlacement = "end";
      }
     }

  mustLogIn: boolean
  buttonPlacement: string = "start"

  ngOnInit() {
  }

  login(loginData) {
    if(this.authGuard.authInfo.email && this.authGuard.authInfo.password) {
      this.authGuard.authInfo.authenticated = true;
      this.authGuard.login(loginData)
      .subscribe(loginData => {
        this.authGuard.userInfo = loginData;
        console.log("User Login",this.authGuard.userInfo);

        //holding onto user info from either a browser, or native storage
        sessionStorage.setItem("userId", this.authGuard.userInfo.userId)
        sessionStorage.setItem("token", this.authGuard.userInfo.token)
        this.storage.set("userId", this.authGuard.userInfo.userId)
        this.storage.set("token", this.authGuard.userInfo.token)

        //setting user id and token to a variable programmatically within application for use later
        this.authGuard.userId = sessionStorage.getItem("userId")
        this.authGuard.userToken = sessionStorage.getItem("token")

        //making sure token and id are set
        console.log("userId set", this.authGuard.userId)
        console.log("token set", this.authGuard.userToken)

        //getting all user info from backend
        this.authGuard.getUserInfo(loginData)
        .subscribe(userData => {

          //setting all user info to a variable for use later (except user token)
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  mustRegister: boolean;

  constructor(
    public router: Router, 
    public authGuard: AuthGuardService, 
    public storage: Storage
    ) { }

  ngOnInit() {
  }

  register(registerData) {
    if(this.authGuard.authInfo.firstName && this.authGuard.authInfo.lastName && this.authGuard.authInfo.email && this.authGuard.authInfo.password) {
      this.authGuard.authInfo.authenticated = true;
      this.authGuard.register(registerData)
      .subscribe(userData => {
        this.authGuard.userInfo = userData;

        //holding onto user info from either a browser, or native storage
        sessionStorage.setItem("userId", this.authGuard.userInfo.userId)
        sessionStorage.setItem("token", this.authGuard.userInfo.token)
        this.storage.set("userId", this.authGuard.userInfo.userId)
        this.storage.set("token", this.authGuard.userInfo.userId)
        
        //setting user id and token to a variable programmatically for use later
        this.authGuard.userId = this.authGuard.userInfo.userId
        this.authGuard.userToken = this.authGuard.userInfo.token

        console.log("User Authenticated Info",this.authGuard.userInfo);
        this.router.navigate(['/home']);
      });
    } else {
      this.mustRegister = true;
    }
  }

}

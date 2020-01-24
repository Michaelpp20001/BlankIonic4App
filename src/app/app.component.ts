import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthGuardService } from './services/auth-guard.service';
import { HTTP } from '@ionic-native/http/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  navigate: any = 
  [
    {
      title : "Home",
      url   : "/home",
      icon  : "home"
    },
    {
      title : "About/Grid",
      url   : "/about",
      icon  : "alert"
    },
    {
      title : "Inputs/Outputs",
      url   : "/inputs",
      icon  : "git-compare"
    },
    {
      title : "Ionic Speaking",
      url   : "/ionic-speaking",
      icon  : "volume-high"
    },
    {
      title : "Photo Gallery",
      url   : "/photo-gallery",
      icon  : "camera"
    },
    {
      title : "Points of Interest",
      url   : "/points-of-interest",
      icon  : "pin"
    },
    {
      title : "Login",
      url   : "/login",
      icon  : "person"
    },
    {
      title : "Register",
      url   : "/register",
      icon  : "contacts"
    },
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authGuard: AuthGuardService,
    private HTTP: HTTP,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.HTTP.setDataSerializer('json')
    });
  }

  onLogout(token) {
    this.authGuard.logout(token).subscribe( (res: any) => {
        console.log("logout user pre clear", "userInfo", this.authGuard.userInfo, "current user", this.authGuard.userId, "current token", this.authGuard.userToken)
        this.authGuard.clearUserInfo()
        console.log("logout user post clear", "userInfo", this.authGuard.userInfo, "current user", this.authGuard.userId, "current token", this.authGuard.userToken)
        this.router.navigate(["/login"])
    })
  }

}

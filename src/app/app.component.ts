import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthGuardService } from './services/auth-guard.service';
import { HTTP } from '@ionic-native/http/ngx';

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
    private authService: AuthGuardService,
    private HTTP: HTTP,
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
    this.authService.logout(token)
    console.log("logout user", this.authService.userInfo)
    this.authService.clearUserInfo()
  }

}

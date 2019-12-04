import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
      title : "About",
      url   : "/about",
      icon  : "alert"
    },
    {
      title : "Inputs/Outputs",
      url   : "/inputs",
      icon  : "git-compare"
    },
    {
      title : "Login",
      url   : "/login",
      icon  : "person"
    },
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}

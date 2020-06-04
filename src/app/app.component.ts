import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthGuardService } from './services/auth-guard.service';
import { HTTP } from '@ionic-native/http/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  menuPlacement: string = "start";

  //Sidemenu navigation
  navigate: any = 
  [
    {
      title : "Home",
      url   : "/home",
      icon  : "home"
    },
    {
      title : "Responsive Grid",
      url   : "/about",
      icon  : "grid"
    },
    {
      title : "Inputs-Outputs",
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
      icon  : "finger-print"
    },
    {
      title : "Register",
      url   : "/register",
      icon  : "contacts"
    },
  ]

  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public authGuard: AuthGuardService,
    public HTTP: HTTP,
    public router: Router,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.HTTP.setDataSerializer('json')
      console.log(this.platform.platforms())
      if(this.platform.is('mobileweb') || this.platform.is('desktop')) {
        this.menuPlacement = "end";
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Logged Out',
      message: 'You Are Now Logged Out of the Demo App',
      buttons: ['Thanks']
    });
    await alert.present();
  }

  onLogout(token) {
    this.authGuard.logout(token).subscribe( (res: any) => {

        console.log(
          "logout user pre clear", this.authGuard.userInfo,
          "current user", this.authGuard.userId,
          "current token", this.authGuard.userToken
          )

        this.authGuard.clearUserInfo()

        console.log(
          "logout user post clear", this.authGuard.userInfo, 
          "current user", this.authGuard.userId, 
          "current token", this.authGuard.userToken
          )

          this.presentAlert();

        this.router.navigate(["login"])
    })
  }

}

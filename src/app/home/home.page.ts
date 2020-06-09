import { Component } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public authGuard: AuthGuardService,
    public platform: Platform,
    ) {
    if(this.platform.is('mobileweb') || this.platform.is('desktop')) {
      this.buttonPlacement = "end";
    }
  }

  buttonPlacement: string = "start"

  myInfo() {
    console.log("Michael")
  }
  onLogout(token) {
    this.authGuard.logout(token).subscribe( (res: any) => {

        console.log(
          "logout user pre clear", this.authGuard.userInfo,
          "current user", this.authGuard.userId,
          "current token", this.authGuard.userToken
          )
        this.authGuard.clearUserInfo();
        this.authGuard.resetAuth();

        console.log(
          "logout user post clear", this.authGuard.userInfo, 
          "current user", this.authGuard.userId, 
          "current token", this.authGuard.userToken,
          "open routes", this.authGuard.openRoutes
          )
          //this.router.navigate(["/login"]);
          //this.presentAlert();
    })
  }

}

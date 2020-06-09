import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

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
    public platform: Platform,
    public loaderController: LoadingController,
    public alertController: AlertController,
    ) {
      if(this.platform.is('mobileweb') || this.platform.is('desktop')) {
        this.buttonPlacement = "end";
      }
     }

  mustLogIn: boolean
  buttonPlacement: string = "start"
  error: any

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loaderController.create({
      backdropDismiss: true,
      message: 'Please Wait, Logging In...',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Trouble Logging In',
      message: 'Make sure your credentials are correct',
      buttons: ['OK']
    });

    await alert.present();
  }


  login(loginData) {
    if(this.authGuard.authInfo.email && this.authGuard.authInfo.password) {
      this.presentLoading();
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
        this.authGuard.hasToken = true;
        this.loaderController.dismiss();
        this.router.navigate(['/home']);
      }, error => {
        this.loaderController.dismiss();
        this.presentAlert();
      });
    } else {
      this.loaderController.dismiss();
      this.presentAlert();
      this.mustLogIn = true;
    }
  }
}

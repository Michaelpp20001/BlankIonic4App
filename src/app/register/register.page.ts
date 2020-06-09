import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  buttonPlacement: string = "start";

  constructor(
    public router: Router, 
    public authGuard: AuthGuardService, 
    public storage: Storage,
    public platform: Platform,
    public loaderController: LoadingController,
    public alertController: AlertController,
    ) { 
      if(this.platform.is('mobileweb') || this.platform.is('desktop')) {
        this.buttonPlacement = "end";
      }
    }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loaderController.create({
      backdropDismiss: true,
      message: 'Registering...',
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Trouble Registering',
      message: 'Make sure your credentials are correct',
      buttons: ['OK']
    });
    await alert.present();
  }

  moveFocus(nextElement) {
    nextElement.setFocus();
  }

  register(registerData) {
    if(this.authGuard.authInfo.firstName && this.authGuard.authInfo.lastName && this.authGuard.authInfo.email && this.authGuard.authInfo.password) {
      this.presentLoading();
      this.authGuard.register(registerData)
      .subscribe(userData => {
        this.authGuard.userInfo = userData;

        //holding onto user info from either a browser, or native storage
        sessionStorage.setItem("userId", this.authGuard.userInfo.userId)
        sessionStorage.setItem("token", this.authGuard.userInfo.token)
        this.storage.set("userId", this.authGuard.userInfo.userId)
        this.storage.set("token", this.authGuard.userInfo.userId)
        
        //setting user id and token to a variable programmatically for use later
        this.authGuard.userId = sessionStorage.getItem("userId")
        this.authGuard.userToken = sessionStorage.getItem("token")

        console.log("User Authenticated Info",this.authGuard.userInfo);
        this.authGuard.resetAuth();
        this.loaderController.dismiss();
        this.router.navigate(['/home']);
      }, error => {
        this.loaderController.dismiss();
        this.presentAlert();
      });
    } else {
      this.loaderController.dismiss();
      this.presentAlert();
    }
  }

}

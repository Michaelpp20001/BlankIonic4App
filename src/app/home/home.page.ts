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

}

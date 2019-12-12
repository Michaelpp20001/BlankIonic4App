import { Component } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public authGuard: AuthGuardService) {}

  myInfo() {
    console.log("Michael")
  }

}

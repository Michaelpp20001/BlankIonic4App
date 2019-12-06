import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  mustRegister: boolean;

  constructor(private router: Router, private authGuard: AuthGuardService) { }

  ngOnInit() {
  }

  register(userData) {
    if(this.authGuard.authInfo.firstName && this.authGuard.authInfo.lastName && this.authGuard.authInfo.email && this.authGuard.authInfo.password) {
      this.authGuard.authInfo.authenticated = true;
      this.authGuard.register(userData)
      .subscribe(data => {
        this.authGuard.userInfo = data;
        console.log("User Authenticated Info",this.authGuard.userInfo);
        this.router.navigate(['/home']);
      });
    } else {
      this.mustRegister = true;
    }
  }

}

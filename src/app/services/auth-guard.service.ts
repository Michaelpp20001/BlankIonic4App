import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  authInfo = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    authenticated: false,
  }

  userInfo: any

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    if (!this.authInfo.authenticated) {
      this.router.navigate(["login"]);
      return false;
    }

    return true;
  }
}

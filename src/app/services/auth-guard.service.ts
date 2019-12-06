import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private http: HTTP, private ngHttp: HttpClient) { }

  authInfo = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    authenticated: false,
  }

  userInfo: any

  baseUrl: string = "http://localhost:3000/api/appUsers"

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    if (!this.authInfo.authenticated) {
      this.router.navigate(["login"]);
      return false;
    }

    return true;
  }

  register(userData) {
    return this.ngHttp.post(`${this.baseUrl}`, userData)
  }
}

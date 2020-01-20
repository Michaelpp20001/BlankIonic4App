import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
     private HTTP: HTTP, 
     private ngHttp: HttpClient,
     public storage: Storage,
     ) { }

  authInfo = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    authenticated: false,
  }

  userInfo: any
  userId: any
  userToken: any

  //this url works for browser requests
  baseUrl: string = "http://localhost:3000/api/appUsers"

  //this url works for dev app requests at home
  advancedBaseUrl: string = "http://192.168.1.179:3000/api/appUsers"

  //this url works for dev app requests at Learn
  baseUrlLearn: string = "http://192.168.35.128:3000/api/appUsers"

  //this url works for dev app requests at SoftStack offices
  baseUrlSoftStack: string = "http://192.168.0.109:3000/api/appUsers"

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    if (!this.authInfo.authenticated) {
      this.router.navigate(["login"]);
      return false;
    }

    return true;
  }

  register(userData) {
    return this.ngHttp.post(`${this.advancedBaseUrl}`, userData)
  }

  login(userData) {
    return this.ngHttp.post(`${this.advancedBaseUrl}/login`, userData)
  }

  logout(token) {
    return this.ngHttp.post(`${this.advancedBaseUrl}/logout?access_token=${token}`, token)
  }

  getUserInfo(userInfo) {
    return this.ngHttp.get(`${this.advancedBaseUrl}/${userInfo.userId}?access_token=${this.userToken}`)
  }

  clearUserInfo() {
    this.authInfo = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      authenticated: false,
    }
    this.userInfo = ""
    this.userId = ""
    this.userToken = ""
    sessionStorage.clear()
    this.storage.clear()
  }

  //This request is for using the advanced http cordova plugin
  loginAdvanced(userData) {
    return this.HTTP.post(`${this.advancedBaseUrl}/login`, {data: userData}, {authorization: "login: token"})
  }
}

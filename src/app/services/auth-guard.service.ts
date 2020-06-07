import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
     public HTTP: HTTP, 
     public ngHttp: HttpClient,
     public storage: Storage,
     public alertController: AlertController,
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

  baseHerokuUrl: string = "https://damp-coast-01431.herokuapp.com/api/appUsers"

  async presentAlert(route) {
    const alert = await this.alertController.create({
      header: `Access Denied to ${route.routeConfig.path} page`,
      subHeader: 'Please Login',
      message: "This application's full features available upon log in",
      buttons: ['OK']
    });

    await alert.present();
  }

  //Activated route logic, only home route is activated for a logged in user, check app routing module
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authInfo.authenticated) {
      console.log(`Denied access to ${route.routeConfig.path} page`);
      this.router.navigate(["login"]);
      this.presentAlert(route);
      return false;
    } else {
      return true;
    }
  }

  register(userData) {
    return this.ngHttp.post(`${this.baseHerokuUrl}`, userData)
  }

  login(userData) {
    return this.ngHttp.post(`${this.baseHerokuUrl}/login`, userData)
  }

  logout(token) {
    return this.ngHttp.post(`${this.baseHerokuUrl}/logout?access_token=${token}`, token)
  }

  getUserInfo(userInfo) {
    return this.ngHttp.get(`${this.baseHerokuUrl}/${userInfo.userId}?access_token=${userInfo.token}`)
  }

  clearUserInfo() {
    this.authInfo = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      authenticated: false,
    }
    delete this.userInfo
    delete this.userId
    delete this.userToken
    sessionStorage.clear()
    this.storage.clear()
  }

  //This request is for using the advanced http cordova plugin
  loginAdvanced(userData) {
    return this.HTTP.post(`${this.baseHerokuUrl}/login`, {data: userData}, {authorization: "login: token"})
  }
}

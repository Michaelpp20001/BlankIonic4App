import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule } from '@angular/common/http'
import { Camera } from '@ionic-native/camera/ngx'
import { IonicStorageModule } from '@ionic/storage';
import { PhotoServiceService } from './services/photo.service'
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(), AppRoutingModule],
  providers: [
    HTTP,
    StatusBar,
    SplashScreen,
    PhotoServiceService,
    Camera,
    TextToSpeech,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

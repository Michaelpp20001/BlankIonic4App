import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { EnvServiceProvider } from './services/env.service.provider';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule } from '@angular/common/http'
import { Camera } from '@ionic-native/camera/ngx'
import { IonicStorageModule } from '@ionic/storage';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    HttpClientModule,
    IonicStorageModule.forRoot(),
    ComponentsModule,
    IonicModule.forRoot(), AppRoutingModule],
  providers: [
    EnvServiceProvider,
    HTTP,
    StatusBar,
    SplashScreen,
    Camera,
    TextToSpeech,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

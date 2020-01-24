import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private geolocation: Geolocation
  ) { }

  currentLatitude: any
  currentLongitude: any

  currentLocation() {
  this.geolocation.getCurrentPosition().then((resp) => {
    this.currentLatitude = resp.coords.latitude
    this.currentLongitude = resp.coords.longitude
   }).catch((error) => {
     console.log('Error getting location', error);
   });
  }
}

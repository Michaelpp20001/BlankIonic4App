import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  @ViewChild('map', {static: true}) mapElement: ElementRef;

  constructor(
    private geolocation: Geolocation
  ) { }

  lat: any;
  lng: any;

  currentLocation() {
  this.geolocation.getCurrentPosition().then((resp) => {

    this.lat = resp.coords.latitude 
    this.lng = resp.coords.longitude

    console.log(resp)

   }).catch((error) => {
     console.log('Error getting location', error);
   });
  }
  
}

import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  @ViewChild('map', {static: true}) mapElement: ElementRef;

  constructor(
    private geolocation: Geolocation,
    private platform: Platform
  ) { }

  startCoordinates = new google.maps.LatLng(32.746702299999995, -117.05977409999998);
  currentLatLng: any;
  searchTerm: any;

  mapOptions = {
    center: this.startCoordinates,
    zoom: 1,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  }

  getCurrentLocation() {
    console.log("this ran")
    this.platform.ready().then(()=>{
      let options = {
        timeout: 3000,
        enableHighAccuracy: true
        }
      this.geolocation.getCurrentPosition(options).then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        console.log(resp)
       }).catch((error) => {
         console.log('Error getting location', error);
       });
    })
  }

  getSearchTerm(e) {
    console.log(e.target.value)
  }

  currentLocation() {
  return this.geolocation.getCurrentPosition()
  }

  findPlaces() {

  }
}

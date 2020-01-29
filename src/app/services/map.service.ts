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

  startCoordinates = new google.maps.LatLng(32.746702299999995, -117.05977409999998);
  currentLatLng: any;

  mapOptions = {
    center: this.startCoordinates,
    zoom: 1,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  }

  currentLocation() {
  return this.geolocation.getCurrentPosition()
  }
}

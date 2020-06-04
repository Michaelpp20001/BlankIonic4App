import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  @ViewChild('map', {static: true}) mapElement: ElementRef;

  constructor(
    public geolocation: Geolocation,
    public platform: Platform,
    public http: HttpClient
  ) { }

  API_KEY = "AIzaSyAG-gA-cCbX2qlfsAfHWxlP6vxOOf5_a8U"
  findUrl: string = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?"
  proxyUrl = "https://cors-anywhere.herokuapp.com/";

  startCoordinates = new google.maps.LatLng(32.746702299999995, -117.05977409999998);
  currentLatLng: any;
  searchTerm: any;

  reqLat: any;
  reqLon: any;

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
        this.reqLat = resp.coords.latitude
        this.reqLon = resp.coords.longitude
        console.log(resp)
       }).catch((error) => {
         console.log('Error getting location', error);
       });
    })
  }

  getSearchTerm(e) {
    this.searchTerm = e.target.value;
  }

  currentLocation() {
  return this.geolocation.getCurrentPosition()
  }

  findPlaces() {
    console.log("Search for", this.searchTerm)
    console.log("My current location", this.reqLat, this.reqLon)
    return this.http.get(`${this.proxyUrl}${this.findUrl}input=${this.searchTerm}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&locationbias=circle:6000@${this.reqLat},${this.reqLon}&key=${this.API_KEY}`)
  }
}

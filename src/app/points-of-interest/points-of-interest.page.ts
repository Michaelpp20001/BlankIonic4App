import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from '../services/map.service';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { EnvService } from "../services/env.service";
import { LoadingController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-points-of-interest',
  templateUrl: './points-of-interest.page.html',
  styleUrls: ['./points-of-interest.page.scss'],
})
export class PointsOfInterestPage implements OnInit {

  @ViewChild('map', {static: true}) mapElement: ElementRef;
  map: any;
  marker: any;

  
  constructor(
    public mapService: MapService,
    public alertController: AlertController,
    public platform: Platform,
    public env: EnvService,
    public loaderController: LoadingController,
  ) {
    if(this.platform.is('mobileweb') || this.platform.is('desktop')) {
      this.buttonPlacement = "end";
    }
  }
  
  ngOnInit() {
    this.loadMap()
    this.mapService.getCurrentLocation()
  }

  buttonPlacement: string = "start";

  async presentLoading() {
    const loading = await this.loaderController.create({
      message: 'Please wait...',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  loadMap(){
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapService.mapOptions);
    if(this.marker) {
      this.marker.setMap(this.map)
    }
  }

  getCurrentLocation() {
    this.presentLoading();
    this.mapService.currentLocation().then((resp) => {

      console.log(resp)

      this.mapService.currentLatLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude)
      this.mapService.mapOptions = {
        center: this.mapService.currentLatLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.marker = new google.maps.Marker({
        position: this.mapService.currentLatLng,
        map: this.map,
      });
      this.loadMap();
      this.loaderController.dismiss();
     }).catch((error) => {
       console.log('Error getting location', error);
       this.loaderController.dismiss();
     });
    }

    getFindLocation(lat, lon, name) {
      this.mapService.currentLatLng = new google.maps.LatLng(lat, lon)
      this.mapService.mapOptions = {
        center: this.mapService.currentLatLng,
        zoom:14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.marker = new google.maps.Marker({
        position: this.mapService.currentLatLng,
        label: name,
        map: this.map
      });
      this.loadMap();
    }

    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'No Search Results',
        message: `No results for ${this.mapService.searchTerm}`,
        buttons: ['OK']
      });
      await alert.present();
    }

    onFindPlaces() {
      this.presentLoading();
      this.mapService.findPlaces(this.env.API_KEY)
      .subscribe((res: any) => {
        console.log("find places response", res)
        if(res.status === "OK") {
          let found = res.candidates[0].geometry.location;
          let name = res.candidates[0].name;
          this.getFindLocation(found.lat, found.lng, name)
          this.loaderController.dismiss();
        }
        else {
          this.loaderController.dismiss();
          this.presentAlert();
        }
      })
    }

}

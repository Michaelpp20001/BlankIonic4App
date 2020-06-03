import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from '../services/map.service';
import { PhotoGalleryPageRoutingModule } from '../photo-gallery/photo-gallery-routing.module';

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
    private mapService: MapService
  ) {}
  
  ngOnInit() {
    this.loadMap()
    this.mapService.getCurrentLocation()
  }

  loadMap(){
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapService.mapOptions);
    if(this.marker) {
      this.marker.setMap(this.map)
    }
  }

  getCurrentLocation() {
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
      this.loadMap()
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    }

    getFindLocation(lat, lon) {
      this.mapService.currentLatLng = new google.maps.LatLng(lat, lon)
      this.mapService.mapOptions = {
        center: this.mapService.currentLatLng,
        zoom:14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.marker = new google.maps.Marker({
        position: this.mapService.currentLatLng,
        map: this.map
      });
      this.loadMap();
    }

    onFindPlaces() {
      this.mapService.findPlaces()
      .subscribe((res: any) => {
        console.log("find places response", res)
        if(res.status === "OK") {
          let found = res.candidates[0].geometry.location;
          this.getFindLocation(found.lat, found.lng)
        }
      })
    }

}

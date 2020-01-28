import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from '../services/map.service';

declare var google;

@Component({
  selector: 'app-points-of-interest',
  templateUrl: './points-of-interest.page.html',
  styleUrls: ['./points-of-interest.page.scss'],
})
export class PointsOfInterestPage implements OnInit {

  @ViewChild('map', {static: true}) mapElement: ElementRef;
  map: any

  constructor(
    private mapService: MapService
  ) {}
  
  ngOnInit() {
    this.loadMap()
  }

  loadMap(){

    let latLng = new google.maps.LatLng(32.746702299999995, -117.05977409999998);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

}

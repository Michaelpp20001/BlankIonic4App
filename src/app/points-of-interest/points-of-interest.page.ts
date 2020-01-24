import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-points-of-interest',
  templateUrl: './points-of-interest.page.html',
  styleUrls: ['./points-of-interest.page.scss'],
})
export class PointsOfInterestPage implements OnInit {

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit() {
  }

}

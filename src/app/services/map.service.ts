import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private geolacation: Geolocation
  ) { }
}

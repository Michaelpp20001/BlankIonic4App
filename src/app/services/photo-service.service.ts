import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

class Photo {
  data: any;
}

export class PhotoServiceService {

  constructor(
    private camera: Camera,
    private storage: Storage) { }
}

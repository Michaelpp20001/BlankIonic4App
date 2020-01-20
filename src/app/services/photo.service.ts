import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

class Photo {
  data: any;
}

export class PhotoServiceService {
  photoDetail: any;

  public photos: Photo[] = [];

  constructor(
    private camera: Camera,
    private storage: Storage,
    public alertController: AlertController
    ) { }

    async presentDeleteConfirm(photo) {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: 'Are you sure you want to <strong>Delete</strong>?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Delete',
            handler: () => {
              let result = this.photos.splice( this.photos.findIndex(find => find.data === photo.data), 1);
              console.log("deleted")
              this.set()
            }
          }
        ]
      });
      await alert.present();
    }

    takePicture() {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
      };
  
      this.camera.getPicture(options).then((imageData) => {
        // Add new photo to gallery
        this.photos.unshift({
          data: 'data:image/jpeg;base64,' + imageData
        });
        // Save all photos for later viewing
        this.set();
      }, (err) => {
        // Handle error
        console.log("Camera issue:" + err);
      });
    }

    //resets storage key and value of photos
    set() {
      this.storage.set('photos', this.photos);
    }

    loadSaved() {
      this.storage.get('photos').then((photos) => {
      this.photos = photos || [];
      });
    }
}

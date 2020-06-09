import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

class Photo {
  data: any;
  description: any;
}

export class PhotoServiceService {

  constructor(
    public camera: Camera, 
    public storage: Storage,
    public alertController: AlertController
    ) { }

  description: any;
  photoDetail: any;

  public photos: Photo[] = [];

    async presentAlertConfirm(imageData) {
      const alert = await this.alertController.create({
        header: 'Add Info',
        message: 'Would you like to add a <strong>description</strong>?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              this.description = null;
              this.addPhoto(imageData)

            }
          }, {
            text: 'Okay',
            handler: () => {
              this.presentAlertPrompt(imageData);
            }
          }
        ]
      });
  
      await alert.present();
    }

    async presentAlertPrompt(imageData) {
      const alert = await this.alertController.create({
        header: 'Add Info',
        inputs: [
          {
            name: 'description',
            type: "text",
            placeholder: 'Description'
          },
        ],
        buttons: [
          {
            text: 'Done',
            handler: (data) => {
              this.description = data.description;
              this.addPhoto(imageData);
            }
          }
        ]
      });
  
      await alert.present();
    }

    async presentDeleteConfirm(photo) {
      const alert = await this.alertController.create({
        header: 'Delete?',
        message: 'Are you sure you want to <strong>Delete</strong>?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
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

    addPhoto(imageData) {
    // Add new photo to gallery
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData,
        description: this.description
      });
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
        this.presentAlertConfirm(imageData);
        this.set();
      }, (err) => {
        console.log("Camera issue:" + err);
      });
    }

    //resets storage key and value of photos/saves photos
    set() {
      this.storage.set('photos', this.photos);
    }

    loadSaved() {
      this.storage.get('photos').then((photos) => {
      this.photos = photos || [];
      });
    }
}

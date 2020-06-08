import { Component } from '@angular/core';
import { PhotoServiceService } from '../services/photo.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.page.html',
  styleUrls: ['./photo-gallery.page.scss'],
})
export class PhotoGalleryPage  {

  constructor(
    public photoService: PhotoServiceService, 
    public router: Router,
    public platform: Platform
    ) {
      if(this.platform.is('mobileweb') || this.platform.is('desktop')) {
        this.buttonPlacement = "end";
      }
      this.photoService.loadSaved();
    }

  buttonPlacement: string = "start";

  ngOnInit() {
  }

  delete(photo) {
    this.photoService.presentDeleteConfirm(photo)
  }

  detail(photo) {
    this.photoService.photoDetail = photo
    this.router.navigate(['photo-detail'])
  }

}

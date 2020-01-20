import { Component } from '@angular/core';
import { PhotoServiceService } from '../services/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.page.html',
  styleUrls: ['./photo-gallery.page.scss'],
})
export class PhotoGalleryPage  {

  constructor(public photoService: PhotoServiceService, public router: Router) { }

  ngOnInit() {
    this.photoService.loadSaved();
  }


  delete(photo) {
    this.photoService.presentDeleteConfirm(photo)
  }

  detail(photo) {
    this.photoService.photoDetail = photo
    this.router.navigate(['photo-detail'])
  }

}

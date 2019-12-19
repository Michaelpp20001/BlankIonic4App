import { Component } from '@angular/core';
import { PhotoServiceService } from '../services/photo.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.page.html',
  styleUrls: ['./photo-gallery.page.scss'],
})
export class PhotoGalleryPage  {

  constructor(public photoService: PhotoServiceService) { }

  ngOnInit() {
    this.photoService.loadSaved();
  }

}

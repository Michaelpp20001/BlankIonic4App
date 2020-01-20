import { Component, OnInit } from '@angular/core';
import { PhotoServiceService } from '../services/photo.service'

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.page.html',
  styleUrls: ['./photo-detail.page.scss'],
})
export class PhotoDetailPage implements OnInit {

  constructor(public photoService: PhotoServiceService) { }

  ngOnInit() {
  }

}

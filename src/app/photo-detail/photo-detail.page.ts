import { Component, OnInit } from '@angular/core';
import { PhotoServiceService } from '../services/photo.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.page.html',
  styleUrls: ['./photo-detail.page.scss'],
})
export class PhotoDetailPage implements OnInit {

  constructor(
    public photoService: PhotoServiceService,
    public router: Router,
    ) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(["photo-gallery"]);
  }

}

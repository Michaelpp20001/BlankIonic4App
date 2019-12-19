import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoGalleryPage } from './photo-gallery.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoGalleryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoGalleryPageRoutingModule {}

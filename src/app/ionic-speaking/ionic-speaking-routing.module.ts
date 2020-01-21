import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IonicSpeakingPage } from './ionic-speaking.page';

const routes: Routes = [
  {
    path: '',
    component: IonicSpeakingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IonicSpeakingPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PointsOfInterestPage } from './points-of-interest.page';

const routes: Routes = [
  {
    path: '',
    component: PointsOfInterestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointsOfInterestPageRoutingModule {}

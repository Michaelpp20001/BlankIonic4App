import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointsOfInterestPageRoutingModule } from './points-of-interest-routing.module';

import { PointsOfInterestPage } from './points-of-interest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointsOfInterestPageRoutingModule
  ],
  declarations: [PointsOfInterestPage]
})
export class PointsOfInterestPageModule {}

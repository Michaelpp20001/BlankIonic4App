import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IonicSpeakingPageRoutingModule } from './ionic-speaking-routing.module';

import { IonicSpeakingPage } from './ionic-speaking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSpeakingPageRoutingModule
  ],
  declarations: [IonicSpeakingPage]
})
export class IonicSpeakingPageModule {}

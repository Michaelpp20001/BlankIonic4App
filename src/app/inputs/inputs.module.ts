import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module'

import { IonicModule } from '@ionic/angular';

import { InputsPageRoutingModule } from './inputs-routing.module';

import { InputsPage } from './inputs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InputsPage]
})
export class InputsPageModule {}

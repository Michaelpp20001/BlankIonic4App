import { NgModule } from '@angular/core';
import { InputComponent } from './input/input.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        IonicModule
    ],
    declarations: [
        InputComponent
    ],
    exports: [
        InputComponent
    ],
})

export class ComponentsModule {}
import { NgModule } from '@angular/core';
import { InputComponent } from './input/input.component';
import { TabsComponent } from './tabs/tabs.component'; 
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        IonicModule
    ],
    declarations: [
        InputComponent,
        TabsComponent
    ],
    exports: [
        InputComponent,
        TabsComponent
    ],
})

export class ComponentsModule {}
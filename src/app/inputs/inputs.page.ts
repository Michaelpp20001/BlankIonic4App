import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.page.html',
  styleUrls: ['./inputs.page.scss'],
})
export class InputsPage implements OnInit {

  myExample: string = "Hello World"

  myCount: number = 0

  constructor(
    public platform: Platform
  ) {
    if(this.platform.is('mobileweb') || this.platform.is('desktop')) {
      this.buttonPlacement = "end";
    }
   }

   buttonPlacement: string = "start";

  countChange(event) {
    console.log(event)
    this.myCount = event
  }

  ngOnInit() {
  }

}

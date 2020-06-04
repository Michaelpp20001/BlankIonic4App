import { Component, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-ionic-speaking',
  templateUrl: './ionic-speaking.page.html',
  styleUrls: ['./ionic-speaking.page.scss'],
})
export class IonicSpeakingPage implements OnInit {

  constructor(
    public TTS: TextToSpeech,
    public platform: Platform
  ) { 
    if(this.platform.is('mobileweb') || this.platform.is('desktop')) {
      this.buttonPlacement = "end";
    }
  }

  ngOnInit() {
  }
  buttonPlacement: string = "start";
  textSentence: string
  locale: string
  range: number = .01

  speak() {
    this.TTS.speak({
      text: this.textSentence,
      locale: this.locale,
      rate: this.range
  })
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log("error", reason));
  }
}

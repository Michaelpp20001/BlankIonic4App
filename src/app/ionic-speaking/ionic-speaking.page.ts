import { Component, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-ionic-speaking',
  templateUrl: './ionic-speaking.page.html',
  styleUrls: ['./ionic-speaking.page.scss'],
})
export class IonicSpeakingPage implements OnInit {

  constructor(
    public TTS: TextToSpeech,
  ) { }

  ngOnInit() {
  }

  textSentence: string
  locale: string
  range: number

  speak() {
    this.TTS.speak({
      text: this.textSentence,
      locale: this.locale,
      rate: this.range
  })
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }
}

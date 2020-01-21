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
<<<<<<< HEAD
  range: number = .01
=======
  range: number
>>>>>>> 91b90380ecd73ce467acedf97633440da1c84f82

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

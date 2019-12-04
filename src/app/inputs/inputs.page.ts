import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.page.html',
  styleUrls: ['./inputs.page.scss'],
})
export class InputsPage implements OnInit {

  myExample: string = "Hello World"

  myCount: number = 0

  constructor() { }

  countChange(event) {
    
  }

  ngOnInit() {
  }

}

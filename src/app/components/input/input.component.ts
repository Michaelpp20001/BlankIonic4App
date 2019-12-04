import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() 
  examples: string

  @Input()
  count: number

  @Output() 
  change: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  increment() {
    this.count++
    this.change.emit(this.count)
  }

  decrement() {
    this.count--
    this.change.emit(this.count)
  }

  ngOnInit() {}

}

import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  text :string = ""; 
  control = new FormControl('');

  @Output() cancelEvent: EventEmitter<null> = new EventEmitter();
  @Output() displayEvent: EventEmitter<null> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  emitCancelEvent() {
    this.cancelEvent.emit();
  }

  emitDisplayEvent() {
    this.displayEvent.emit();
  }
}

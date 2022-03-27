import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  text: string = ""; 
  control = new FormControl('');

  @Output() cancelEvent: EventEmitter<null> = new EventEmitter();
  @Output() displayEvent: EventEmitter<null> = new EventEmitter();

  constructor(public urlService: UrlService) { }

  ngOnInit(): void { }

  emitCancelEvent() {
    this.cancelEvent.emit();
  }

  emitDisplayEvent() {
    this.displayEvent.emit();
  }
}

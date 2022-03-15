import { Component, OnInit } from '@angular/core';
import { AutoCompleteService } from './auto-complete.service';

//import { Observable } from 'rxjs';


@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {
  object: Array<any> = [];
  constructor(private autoCompleteService: AutoCompleteService) { }
  ngOnInit(): void { }
  get(stock_id :string) {
    this.autoCompleteService.get(stock_id)
    .subscribe(data => this.object = data.body.result);
    console.log(this.object);
  }
}

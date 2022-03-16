import { Component, OnInit, OnChanges} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  text :string = ""; 
  control = new FormControl('');
  constructor() { }

  ngOnInit(): void { }
}

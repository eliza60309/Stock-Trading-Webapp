import { InputModalityDetector } from '@angular/cdk/a11y';
import { Component, OnInit, Input, Output} from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  active: number = 1;
  @Input() stock_id: string = "";
  @Output()
  @Input() colorGreen: boolean = true;

  constructor() { }

  ngOnInit(): void { }

}

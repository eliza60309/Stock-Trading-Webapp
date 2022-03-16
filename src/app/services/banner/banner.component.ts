import { Component,  OnInit, Input, Output, EventEmitter } from '@angular/core';
import { timeout } from 'rxjs';
import { MainService } from '../main.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  @Output() emitNoDataEvent = new EventEmitter<null>();
  @Output() emitCompleteEvent = new EventEmitter<null>();
  emitted: boolean = false;
  hide: boolean = true;
  
  @Input() stock_id: string = "";
  updateTime: number;
  marketOpen: boolean = true;

  ticker: string = "";
  name: string = "";
  exchange: string = "";
  logo: string = "";

  c: number = 0;
  d: number = 0;
  dp: number = 0;
  t: number = 0;

  constructor(private mainService: MainService) {
    this.updateTime = new Date().getTime();
  }
  
  ngOnInit(): void {
    this.updateQuery();
    this.updateQuote();
    setTimeout(() => this.loadComplete(), 5000);
    console.log("init" + this.stock_id);
  }

  loadComplete(){
    if(!this.emitted) {
      this.emitCompleteEvent.emit();
      this.emitted = true;
      this.hide = false;
      console.log("emit" + this.stock_id);
    }
  }

  updateQuery(): void {
    this.mainService.get(
      "query",
      [{key: "STOCK_ID", value: this.stock_id}]
    )
    .subscribe(data => {
      if(data.body && Object.keys(data.body).length != 0) {
        this.ticker = data.body.ticker;
        this.name = data.body.name;
        this.exchange = data.body.exchange;
        this.logo = data.body.logo;
      }
      else
        this.emitNoDataEvent.emit();
    });
  }

  updateQuote(): void {
    this.mainService.get(
      "quote",
      [{key: "STOCK_ID", value: this.stock_id}]
    )
    .subscribe(data => {
      if(data.body && Object.keys(data.body).length != 0) {
        this.c = data.body.c;
        this.d = data.body.d == null? 0: data.body.d;
        this.dp = data.body.dp == null? 0: data.body.dp;
        this.t = data.body.t;
        this.updateTime = new Date().getTime();
        this.marketOpen = data.body.t * 1000 + 60000 > this.updateTime? true: false;
      }
    });
  }
}

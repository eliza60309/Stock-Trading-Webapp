import { Component,  OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MainService } from '../main.service';
import { ProfileService } from '../profile.service';
import { UrlService } from '../url.service';
import { WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  @Output() emitNoDataEvent: EventEmitter<null> = new EventEmitter<null>();
  @Output() emitCompleteEvent: EventEmitter<null> = new EventEmitter<null>();
  @Output() emitColorEvent: EventEmitter<boolean> =  new EventEmitter<boolean>();
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
  timeout: any = null;
  interval: any = null;
  constructor(private mainService: MainService, private urlService: UrlService, public watchlistService: WatchlistService, public profileService: ProfileService) {
    this.updateTime = new Date().getTime();
    this.urlService.listener$.subscribe((url: string) => {
      this.stock_id = url;
      this.updateQuery();
      this.updateQuote();
      clearTimeout(this.timeout);
      clearInterval(this.interval);
      this.timeout = setTimeout(() => this.loadComplete(), 5000);
      this.interval = setInterval(() => this.updateQuote(), 15000);
      this.emitted = false;
    });
  }
  
  ngOnInit(): void { }

  loadComplete() {
    if(!this.emitted) {
      this.emitCompleteEvent.emit();
      this.profileService.bannerUpdate(true);
      this.emitted = true;
      this.hide = false;
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

  round(num: number): number {
    return Math.round(num * 100) / 100;
  }

  updateQuote(): void {
    this.mainService.get(
      "quote",
      [{key: "STOCK_ID", value: this.stock_id}]
    )
    .subscribe(data => {
      if(data.body && Object.keys(data.body).length != 0) {
        this.c = this.round(data.body.c);
        this.d = data.body.d == null? 0: this.round(data.body.d);
        this.dp = data.body.dp == null? 0: this.round(data.body.dp);
        this.t = this.round(data.body.t);
        this.updateTime = new Date().getTime();
        this.marketOpen = data.body.t * 1000 + 60000 > this.updateTime? true: false;
        this.d >= 0? this.emitColorEvent.emit(true): this.emitColorEvent.emit(false);
      }
    });
  }
}

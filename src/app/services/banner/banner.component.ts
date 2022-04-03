import { Component,  OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MainService } from '../main.service';
import { PortfolioService } from '../portfolio.service';
import { ProfileService } from '../profile.service';
import { TradeService } from '../trade.service';
import { UrlService } from '../url.service';
import { WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  MSGTIMEOUT: number = 2000;//ms

  request_id: number = 0;
  followMsg: boolean = false;
  unfollowMsg: boolean = false;
  buyMsg: boolean = false;
  sellMsg: boolean = false;
  emitted: boolean = false;
  hide: boolean = true;
  hidebtn: boolean = true;
  follow: boolean = false;
  color: boolean = true;
  
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
  tstring: string = "";
  utstring: string = "";
  timeout: any = null;
  interval: any = null;
  errorTimeout: any = null;

  queryOK: boolean = false;
  quoteOK: boolean = false;
  constructor(private mainService: MainService, private urlService: UrlService, public watchlistService: WatchlistService, public profileService: ProfileService, public portfolioService: PortfolioService, private tradeService: TradeService) {
    this.updateTime = new Date().getTime();
    this.urlService.listener$.subscribe((url: string) => {
      this.reset();
      this.stock_id = url;
      this.updateQuery();
      this.updateQuote();
      clearTimeout(this.timeout);
      clearInterval(this.interval);
      this.timeout = setTimeout(() => this.loadComplete(), 3000);
      this.interval = setInterval(() => this.updateQuote(), 15000);
      //this.errorTimeout = setTimeout(() => this.emitted? void(0): this.failed(), 10000);
      this.checkFollow();
      this.updateQuant();
    });
    this.profileService.listener2.subscribe((color: boolean) => this.color = color);
    this.portfolioService.listener$.subscribe((msg: string) => {
      this.msgEvent(msg);
      this.updateQuant();
    });
    this.watchlistService.listener.subscribe((url: string) => this.msgFollow(url));
  }
  
  reset() {
    this.request_id++;
    clearTimeout(this.errorTimeout);
    clearInterval(this.interval);
    clearTimeout(this.timeout);
    this.emitted = false;
    this.queryOK = false;
    this.quoteOK = false;
  }

  ngOnInit(): void { }

  msgFollow(msg:string) {
    this.follow = this.watchlistService.check(this.stock_id);
  }

  msgEvent(msg: string) {
    if(msg.split("<partitionerYAYA>")[0] == "buy") {
      this.buyMsg = true;
      setTimeout(() => this.buyMsg = false, this.MSGTIMEOUT);
    }
    else if(msg.split("<partitionerYAYA>")[0] == "sell") {
      this.sellMsg = true;
      setTimeout(() => this.sellMsg = false, this.MSGTIMEOUT);
    }
  }

  followEventMsg(follow: boolean) {
    if(follow) {
      this.followMsg = true;
      setTimeout(() => this.followMsg = false, this.MSGTIMEOUT);
    }
    else {
      this.unfollowMsg = true;
      setTimeout(() => this.unfollowMsg = false, this.MSGTIMEOUT);
    }
  }

  updateQuant() {
    if(this.portfolioService.countStock(this.stock_id) == 0)
      this.hidebtn = true;
    else
      this.hidebtn = false;
  }

  buyButton() {
    this.tradeService.displayBuyWindow({stock_id: this.stock_id, price: this.c});
  }

  sellButton() {
    this.tradeService.displaySellWindow({stock_id: this.stock_id, price: this.c});
  }

  checkFollow() {
    this.follow = this.watchlistService.check(this.stock_id);
    //console.log(this.follow);
    return this.follow;
  }

  loadComplete() {
    if(!this.emitted && this.queryOK && this.quoteOK) {
      //this.emitCompleteEvent.emit();
      this.profileService.bannerUpdate(true);
      this.emitted = true;
      this.hide = false;
    }
  }

  failed() {
    this.profileService.bannerUpdate(false);
    this.emitted = true;
    clearInterval(this.interval);
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
        this.queryOK = true;
      }
      //else
      //  this.failed();
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
      if(data.body && Object.keys(data.body).length != 0 && data.body.d != null && data.body.dp != null) {
        this.c = this.round(data.body.c);
        this.d = this.round(data.body.d);
        this.dp = this.round(data.body.dp);
        this.t = this.round(data.body.t);
        this.tstring = new Date(this.t * 1000).toLocaleString('en-US', {'hour12': false}).replace('/', '-').replace('/', '-').replace(',', '');
        this.updateTime = new Date().getTime();
        this.utstring = new Date(this.updateTime).toLocaleString('en-US', {'hour12': false}).replace('/', '-').replace('/', '-').replace(',', '');
        this.marketOpen = data.body.t * 1000 + 5 * 60000 > this.updateTime? true: false;
        //this.d >= 0? this.emitColorEvent.emit(true): this.emitColorEvent.emit(false);
        if(this.d >= 0)
          this.profileService.setTicker(true);
        else
          this.profileService.setTicker(false);
        this.quoteOK = true;
      }
      else {
        this.failed();
      }
    });
  }
}

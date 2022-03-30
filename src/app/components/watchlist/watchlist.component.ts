import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { RoutingService } from 'src/app/services/routing.service';
import { UrlService } from 'src/app/services/url.service';
import { WatchlistService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  MSGTIMEOUT: number = 2000;//ms
  INTERVAL: number = 15000;
  watchlist: Array<string> = [];
  entrylist: Array<any> = [];
  color: number = 0;
  interval: any = null;
  followMsg: boolean = false;
  unfollowMsg: boolean = false;
  stock_id: string = "";
  constructor(private mainService: MainService, public watchlistService: WatchlistService, public urlService: UrlService, public routingService: RoutingService) {
    setTimeout(() => this.updateList(), 500);
    this.watchlistService.listener.subscribe((msg: string) => {
      this.followEventMsg(msg);
      this.updateList()
    });
  }

  followEventMsg(msg: string) {
    if(msg.split("<partitionerYAYA>")[0] == "add") {
      this.followMsg = true;
      setTimeout(() => this.followMsg = false, this.MSGTIMEOUT);
    }
    else {
      this.unfollowMsg = true;
      setTimeout(() => this.unfollowMsg = false, this.MSGTIMEOUT);
    }
    this.stock_id = msg.split("<partitionerYAYA>")[1];
  }

  updateList() {
    this.entrylist = [];
    this.watchlist = WatchlistService.watchlist;
    for(let i = 0; i < this.watchlist.length; i++) {
      this.entrylist.push({stock_id: this.watchlist[i], price: {c: 0, d: 0, dp: 0}, name: ""});
      this.getName(i, this.watchlist[i]);
      this.getQuote(i, this.watchlist[i]);
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        for(let i = 0; i < this.watchlist.length; i++) {
            this.getQuote(i, this.watchlist[i]);
        }
      }, this.INTERVAL);
    }
  }

  ngOnInit(): void { }

  getName(entry: number, stock_id: string) {
    this.mainService.get("query", [{key: "STOCK_ID", value: stock_id}])
    .subscribe(data => {
      if(data.body && Object.keys(data.body).length != 0) {
        this.entrylist[entry].name = data.body.name;
      }
    });
  }

  getQuote(entry: number, stock_id: string) {
    this.mainService.get("quote", [{key: "STOCK_ID", value: stock_id}])
    .subscribe((data: any) => {
      if(data.body && Object.keys(data.body).length != 0 && data.body.d != null && data.body.dp != null) {
        this.entrylist[entry].price.c = this.round(data.body.c);
        this.entrylist[entry].price.d = this.round(data.body.d);
        this.entrylist[entry].price.dp = this.round(data.body.dp);
      }
    });
  }

  round(num: number): number {
    return Math.round(num * 100) / 100;
  }
}

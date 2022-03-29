import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { TradeService } from 'src/app/services/trade.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  MSGTIMEOUT = 2000;//ms

  entrylist: Array<any> = [];
  list: Array<any> = [];
  cash: number = 0;
  buyMsg: boolean = false;
  sellMsg: boolean = false;
  stock_id: string = "";
  constructor(private mainService: MainService, private portfolioService: PortfolioService, public tradeService: TradeService) {
    setTimeout(() => this.updateList(), 500);
    this.portfolioService.listener$.subscribe((msg: string) => {
      this.msgEvent(msg);
      this.updateList()
    });
  }

  ngOnInit(): void { }

  updateList() {
    this.entrylist = [];
    this.list = PortfolioService.portfolio;
    this.cash = PortfolioService.cash.amount;
    for(let i = 0; i < this.list.length; i++) {
      this.entrylist.push({stock_id: this.list[i].stock_id, price: this.list[i].price, unit: this.list[i].unit, name: "", c: this.list[i].price});
      this.getName(i, this.list[i].stock_id);
      this.getQuote(i, this.list[i].stock_id);
    }
  }

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
        this.entrylist[entry].c = this.round(data.body.c);
      }
    });
  }

  round(num: number): number {
    return Math.round(num * 100) / 100;
  }

  buyButton(stock_id: string, price: number) {
    this.tradeService.displayBuyWindow({stock_id: stock_id, price: price});
  }

  sellButton(stock_id: string, price: number) {
    this.tradeService.displaySellWindow({stock_id: stock_id, price: price});
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
    this.stock_id = msg.split("<partitionerYAYA>")[1];
  }
}

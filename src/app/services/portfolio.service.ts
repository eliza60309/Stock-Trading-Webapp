import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PortfolioService {
  static portfolio: Array<any> = [];
  static cash: any;
  private static tunnel = new Subject<string>();
  listener$ = PortfolioService.tunnel.asObservable();
  constructor() {
      if(localStorage.getItem("portfolio"))
      PortfolioService.portfolio = JSON.parse(localStorage.getItem("portfolio")!);
    if(localStorage.getItem("cash"))
      PortfolioService.cash = JSON.parse(localStorage.getItem("cash")!);
    else
    PortfolioService.cash = {"amount": 25000};
    this.updatePortfolio("construct", "");
  }

  findStock(target: string) {
    return PortfolioService.portfolio.findIndex((value) => {
      if(value.stock_id == target)
        return true;
      else
        return false;
    });
  }

  countStock(target: string) {
    let num = 0;
    PortfolioService.portfolio.findIndex((value) => {
      if(value.stock_id == target) {
        num = value.unit;
        return true;
      }
      else
        return false;
    });
    return num;
  }

  buyStock(target: string, price: number, unit: number) {
    let index = this.findStock(target);
    let entry;
    if(index == -1) {
      entry = {"stock_id": target, "price": price, "unit": unit};
      PortfolioService.portfolio.push(entry);
    }
    else {
      entry = PortfolioService.portfolio[index];
      entry.price = (entry.price * entry.unit + price * unit) / (entry.unit + unit);
      entry.unit = entry.unit + unit;
      PortfolioService.portfolio[index] = entry;
    }
    PortfolioService.cash.amount -= price * unit;
    this.updatePortfolio("buy", target);
  }

  sellStock(target: string, price: number, unit: number) {
    let index = this.findStock(target);
    if(index == -1)
      return;
    let entry = PortfolioService.portfolio[index];
    if(entry.unit == unit)
      PortfolioService.portfolio = PortfolioService.portfolio.filter((value) => value.stock_id != target);
    else {
      entry.price = (entry.price * entry.unit - price * unit) / (entry.unit - unit);
      entry.unit = entry.unit - unit;
    }
    PortfolioService.cash.amount += price * unit;
    this.updatePortfolio("sell", target);
  }

  updatePortfolio(method: string, target: string) {
    //console.log(PortfolioService.portfolio);
    localStorage.setItem('portfolio', JSON.stringify(PortfolioService.portfolio));
    localStorage.setItem('cash', JSON.stringify(PortfolioService.cash));
    PortfolioService.tunnel.next(method + "<partitionerYAYA>" + target);
  }
}

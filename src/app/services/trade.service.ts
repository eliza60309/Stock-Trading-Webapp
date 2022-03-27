import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TradeService {
  private static tunnel1 = new Subject<object>();
  buyWindow = TradeService.tunnel1.asObservable();
  private static tunnel2 = new Subject<object>();
  sellWindow = TradeService.tunnel2.asObservable();
  static price: number = 0;
  static stock_id: string = ""; 
  constructor() { }
  displayBuyWindow(stockObj: any) {
    TradeService.stock_id = stockObj.stock_id;
    TradeService.price = stockObj.price;
    TradeService.tunnel1.next(stockObj);
  }

  displaySellWindow(stockObj: any) {
    TradeService.stock_id = stockObj.stock_id;
    TradeService.price = stockObj.price;
    TradeService.tunnel2.next(stockObj);
  }
}

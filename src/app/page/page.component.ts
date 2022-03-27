import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TradeService } from '../services/trade.service';
import { BuyWindowComponent } from '../services/modals/buy-window/buy-window.component';
import { SellWindowComponent } from '../services/modals/sell-window/sell-window.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  price: number = 0;
  stock_id: string = "";

  constructor(private modalService: NgbModal, private tradeService: TradeService) { 
    this.tradeService.buyWindow.subscribe((stockObj: any) => {
      this.stock_id = stockObj.stock_id;
      this.price = stockObj.price;
      this.openBuy();
    });

    this.tradeService.sellWindow.subscribe((stockObj: any) => {
      this.stock_id = stockObj.stock_id;
      this.price = stockObj.price;
      this.openSell();
    });
  }

  ngOnInit(): void { }

  openBuy() {
    this.modalService.open(BuyWindowComponent, {ariaLabelledBy: 'modal-basic-title'});
    //this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  openSell() {
    this.modalService.open(SellWindowComponent, {ariaLabelledBy: 'modal-basic-title'});
    //this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
}

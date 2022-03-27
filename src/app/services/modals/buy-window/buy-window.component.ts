import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { PortfolioService } from '../../portfolio.service';
import { TradeService } from '../../trade.service';


@Component({
  selector: 'app-buy-window',
  templateUrl: './buy-window.component.html',
  styleUrls: ['./buy-window.component.css']
})
export class BuyWindowComponent implements OnInit {

  
  control = new FormControl('');
  cash: number = 0; 
  stock_id: string = "";
  price: number = 0;
  quant: number = 0;
  enabled: boolean = false;
  msg: boolean = false;

  constructor(public activeModal: NgbActiveModal, private portfolioService: PortfolioService) { 
    this.cash = PortfolioService.cash.amount;
    this.stock_id = TradeService.stock_id;
    this.price = TradeService.price;
  }

  ngOnInit(): void { }

  verifyQuant() {
    if(this.price * this.quant > this.cash || this.quant == 0) {
      this.msg = true;
      this.enabled = false;
    }
    else {
      this.msg = false;
      if(this.quant == 0)
        this.enabled = false;
      else
        this.enabled = true;
    }
  }

  buy() {
    this.portfolioService.buyStock(this.stock_id, this.price, this.quant);
    this.activeModal.close();
  }

}

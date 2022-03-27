import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { PortfolioService } from '../../portfolio.service';
import { TradeService } from '../../trade.service';

@Component({
  selector: 'app-sell-window',
  templateUrl: './sell-window.component.html',
  styleUrls: ['./sell-window.component.css']
})
export class SellWindowComponent implements OnInit {

  control = new FormControl('');
  cash: number = 0; 
  stock_id: string = "";
  price: number = 0;
  quant: number = 0;
  enabled: boolean = false;
  msg: boolean = false;
  total: number = 0;
  constructor(public activeModal: NgbActiveModal, private portfolioService: PortfolioService) { 
    this.cash = PortfolioService.cash.amount;
    this.stock_id = TradeService.stock_id;
    this.price = TradeService.price;
  }

  ngOnInit(): void { }

  verifyQuant() {
    this.total = this.quant * this.price;
    if(this.quant > this.portfolioService.countStock(this.stock_id)) {
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

  sell() {
    this.portfolioService.sellStock(this.stock_id, this.price, this.quant);
    this.activeModal.close();
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  cons: number = 0;
  init: number = 0;
  elapsed: number = 0;
  constructor() { 
    this.cons = new Date().getTime();
    setInterval(() => {this.elapsed = new Date().getTime() - this.cons}, 1000);
  }

  ngOnInit(): void {
    this.init = new Date().getTime() - this.cons;
  }

}

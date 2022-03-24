import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../../main.service';
import { Chart } from 'angular-highcharts';
import { UrlService } from '../../url.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  //@Input() stock_id: string = "";
  @Input() colorGreen: boolean = true;
  stock_id: string = "";
  h: number = 0;
  l: number = 0;
  o: number = 0;
  pc: number = 0;
  t: number = 0;
  ipo: string = "";
  industry: string = "";
  webpage: string = "";
  peers: Array<string> = [];
  chart: Chart = new Chart();

  constructor(private mainService: MainService, private urlService: UrlService) {
    this.urlService.listener$.subscribe((url: string) => {
      this.stock_id = url;
      this.update();
    });
  }
  ngOnInit(): void { }

  update() {
    this.updateQuote();
    this.updateQuery();
    this.updatePeer();
    this.updateChart();
  }

  round(num: number): number {
    return Math.round(num * 100) / 100;
  }

  updateQuote() {
    this.mainService.get(
      "quote",
      [{key: "STOCK_ID", value: this.stock_id}]
    )
    .subscribe(data => {
      if(data.body && Object.keys(data.body).length != 0) {
        this.h = this.round(data.body.h);
        this.l = this.round(data.body.l);
        this.o = this.round(data.body.o);
        this.pc = this.round(data.body.pc);
        this.t = this.round(data.body.t);
      }
    });
  }

  updateQuery() {
    this.mainService.get(
      "query",
      [{key: "STOCK_ID", value: this.stock_id}]
    )
    .subscribe(data => {
      if(data.body && Object.keys(data.body).length != 0) {
        this.ipo = data.body.ipo;
        this.webpage = data.body.weburl;
        this.industry = data.body.finnhubIndustry;
      }
    });
  }

  updatePeer() {
    this.mainService.get(
      "peers",
      [{key: "STOCK_ID", value: this.stock_id}]
    )
    .subscribe(data => {
      if(data.body) {
        this.peers = data.body;
      }
    });
  }

  updateChart() {
    this.mainService.get(
      "candle",
      [{key: "STOCK_ID", value: this.stock_id},
      {key: "RESOLUTION", value: "5"},
      {key: "FROM", value: String(this.t - 21600)},
      {key: "TO", value: String(this.t)}]
    )
    .subscribe(data => {
      if(data.body && data.body.o) {
        this.chart = new Chart({
          plotOptions: { line: { marker: { enabled: false }, color: (this.colorGreen? '#00FF00': '#FF0000') } },
          series: [{ data: data.body.o, type: 'line'}],
          legend: { enabled: false },
        });
      }
    });
  }
}
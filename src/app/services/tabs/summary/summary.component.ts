import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../../main.service';
import * as Highcharts from "highcharts/highstock";
import { UrlService } from '../../url.service';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

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
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = { };
  chartData: Array<any> = [];
  chartDone:boolean = false;

  constructor(private mainService: MainService, public urlService: UrlService, private profileService: ProfileService) {
    this.urlService.listener$.subscribe((url: string) => {
      this.stock_id = url;
      this.update();
    });
    this.profileService.listener2.subscribe((color: boolean) => {
      this.colorGreen = color;
      this.setChartOption();
    });
  }
  ngOnInit(): void { }

  update() {
    this.updateQuote();
    this.updateQuery();
    this.updatePeer();
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
        this.updateChart();
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
        this.chartData = [];
        for(let i = 0; i < data.body.o.length; i++){
          this.chartData.push([data.body.t[i] * 1000, data.body.o[i]]);
        }
        this.setChartOption();
      }
    });
  }
  
  setChartOption() {
    this.chartOptions = {
      chart: {height: '70%'},
      title: { text: this.stock_id + " Hourly Price Variation", style: { color: 'grey' } },
      rangeSelector: { enabled: false },
      navigator: { enabled: false }, 
      plotOptions: { line: { marker: { enabled: false }, color: (this.colorGreen? '#00FF00': '#FF0000') } },
      series: [{ data: this.chartData!, type: 'line', name: this.stock_id }],
      legend: { enabled: false },
    }
    this.chartDone = true;
  }
}